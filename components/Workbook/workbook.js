import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, ScrollView } from "react-native";
import { Calendar } from 'react-native-calendars';

import WorkbookHeader from "./WorkbookHeader.js";
import WorkbookList from "./WorkbookList.js";
import WorkbookModal from "./WorkbookModal.js";
import WorkbookFooter from "./WorkbookFooter.js";

const Workbook = (props) => {

    const [userId, setUserId] = useState('');
    const [workbookData, setWorkbookData] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch(process.env.REACT_APP_ADDRESS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: `{getUserInfo(user: "${props.user}"){id}}`})
        })
        .then(r => r.json())
        .then(data => {
            setUserId(data.data.getUserInfo.id);
        });
    },[showModal])

    useEffect(() => {
        console.log("here")
        if(userId != '') {
            fetch(process.env.REACT_APP_ADDRESS, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
                body: JSON.stringify({query: `{getWorkbooks (user_id: "${userId}") {id, name, date, hour, timezone}}`})
            })
            .then(r => r.json())
            .then(data => {
                console.log('data', data)
                setWorkbookData(data);
            });
        }
    },[userId, showModal])

    return (
        <View style={{minHeight:"100%", position:"relative"}}>
            {
                !showModal ?
                    <ScrollView style={{position:"relative", minHeight:"100%"}}>
                        <WorkbookHeader 
                            createWorkbook={ setShowModal } 
                        />
                        <WorkbookList 
                            data={workbookData != '' ? workbookData.data.getWorkbooks : ''} 
                            createWorkbook={ setShowModal } 
                            history={props.history}
                        />
                        {/*<WorkbookFooter/>*/}
                    </ScrollView>
                :
                    <View>
                        <WorkbookModal createWorkbook={ setShowModal } history={props.history} />
                    </View>
            }
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