import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Calendar } from 'react-native-calendars';

import WorkbookHeader from "./WorkbookHeader.js";
import WorkbookList from "./WorkbookList.js";
import WorkbookFooter from "./WorkbookFooter.js";

const Workbook = (props) => {

    const [userId, setUserId] = useState('');
    const [workbookData, setWorkbookData] = useState('');

    useEffect(() => {
        console.log(props.role)
        fetch('http://192.168.1.11:4000/graphql', {
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
            fetch('http://192.168.1.11:4000/graphql', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
                body: JSON.stringify({query: `{getWorkbooks (user_id: "${userId}") {id, name, date, timezone}}`})
            })
            .then(r => r.json())
            .then(data => {
                setWorkbookData(data);
            });
        }
    },[userId])

    const newWorkbook = () => {
        fetch('http://192.168.1.11:4000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({query: `mutation {createWorkbook(name:"TestWorkbook2", date:"5", timezone:"gmt")}`})
        })
        .then(r => r.json())
        .then(data => {
            fetch('http://192.168.1.11:4000/graphql', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
                body: JSON.stringify({query: `mutation {createWorkbookUser(user_id:"2", workbook_id:"2")}`})
            })
            .then(r => r.json())
            .then(data => {
                console.log(data)
            });
        });
    }

    return (
        <View style={{position:"relative", height:"100%"}}>
            <WorkbookHeader/>
            <WorkbookList data={workbookData != '' ? workbookData.data.getWorkbooks : ''}/>
            
                <View style={{position: "absolute", display: "flex", height: "100%", width: "100%", justifyContent: "center"}}>
                    <Text style={{alignSelf: "center"}}>Acrescentar Workbook</Text>
                    
                    <Text>Name</Text>
                    <TextInput
                        //onChange={ handlePassword }
                        //value={props.password}
                    />
                    <TouchableOpacity onPress={newWorkbook}>
                        <Text>Create</Text>
                    </TouchableOpacity>
                </View>
            <WorkbookFooter/>
        </View>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    email: state.email,
    password: state.password,
    role: state.role
})

export default connect(mapStateToProps)(Workbook);