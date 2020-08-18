import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";

import WorkbookHeader from "./WorkbookHeader.js";
import WorkbookList from "./WorkbookList.js";
import WorkbookFooter from "./WorkbookFooter.js";

const Workbook = (props) => {

    const [userId, setUserId] = useState('');
    const [workbookData, setWorkbookData] = useState('');

    useEffect(() => {
        fetch('http://192.168.1.16:4000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({query: `{getUserInfo(user: "${props.user}"){id}}`})
          })
            .then(r => r.json())
            .then(data => setUserId(data.data.getUserInfo.id));
    },[])

    useEffect(() => {
        if(userId != '') {
            fetch('http://192.168.1.16:4000/graphql', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
                body: JSON.stringify({query: `{getWorkbooks (user_id: "${userId}") {id,name}}`})
            })
            .then(r => r.json())
            .then(data => {
                setWorkbookData(data);
            });
        }
    },[userId])

    useEffect(() => {
        //console.log('data', workbookData.data.getWorkbooks)
    }, [workbookData])

    return (
        <View style={{position:"relative", height:"100%"}}>
            <WorkbookHeader/>
            <WorkbookList data={workbookData != '' ? workbookData.data.getWorkbooks : ''}/>
            <WorkbookFooter/>
        </View>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    email: state.email,
    password: state.password
})

export default connect(mapStateToProps)(Workbook);