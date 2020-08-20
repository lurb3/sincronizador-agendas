import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import { Link } from "react-router-native";

import * as WorkbookStyles from "../Styles/WorkbookStyles";

const WorkbookModal = (props) => {

    const [workbookName, setWorkbookName] = useState('');
    const [workbookDate, setWorkbookDate] = useState('');
    const [userTimezone, setUserTimezone] = useState('');

    const handleWorkbookName = (e) => {
        setWorkbookName(e.nativeEvent.text);
    }
    
    const handleWorkbookDate = (e) => {
        setWorkbookDate(e.nativeEvent.text);
    }

    const newWorkbook = () => {
        fetch('http://192.168.1.11:4000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({query: `mutation {createWorkbook(name:"${workbookName}", date:"${workbookDate}", timezone:"${userTimezone}")}`})
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

    useEffect(()=> {
        let currentTimezone = momentTimezone.tz.guess();
        setUserTimezone(currentTimezone)
    }, [])

    return (
        <View style={{position: "absolute", display: "flex", height: "100%", width: "100%", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)"}}>
            <View style={{backgroundColor:"rgba(0,0,0,0.7)", padding:30}}>
                <Text style={{alignSelf: "center", color:"white"}}>Acrescentar Workbook</Text>
                
                <Text style={{color:"white", alignSelf:"center", marginTop:30}}>Name</Text>
                <TextInput
                    onChange={ handleWorkbookName }
                    style={{backgroundColor:"white", color:"black"}}
                />
                <Text style={{color:"white", alignSelf:"center", marginTop:5}}>Date</Text>
                <TextInput
                    onChange={ handleWorkbookDate }
                    style={{backgroundColor:"white", color:"black"}}
                />
                <TouchableOpacity onPress={newWorkbook} style={{alignSelf:"center", backgroundColor:"blue", padding:10, marginTop:20}}>
                    <Text style={{color:"white"}}>Create</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default WorkbookModal;