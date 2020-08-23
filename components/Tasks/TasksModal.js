import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, TextInput, Button, Image } from "react-native";
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import DateTimePicker from '@react-native-community/datetimepicker';

import DropDownPicker from 'react-native-dropdown-picker';
import { Link } from "react-router-native";

import * as WorkbookStyles from "../Styles/WorkbookStyles";
import CloseBtn from "../../images/workbook/close.png";
import CalendarIcon from "../../images/calendar_icon.png";
import TimeIcon from "../../images/time_icon.png";
import UsersIcon from "../../images/workbook/users_icon.png";

const TasksModal = (props) => {

    const [workbookName, setWorkbookName] = useState('');
    const [userTimezone, setUserTimezone] = useState('');

    const handleWorkbookName = (e) => {
        setWorkbookName(e.nativeEvent.text);
    }

    const newWorkbook = () => {
        
        fetch('http://192.168.1.16:4000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            //body: JSON.stringify({query: `mutation {createWorkbook(name:"${workbookName}", date:"${displayDate}", hour:"${displayHour}" timezone:"${userTimezone}")}`})
        })
        .then(r => r.json())
    }

    return (
        <ScrollView style={{ display: "flex", flexDirection:"column", minHeight: "100%", width: "100%", backgroundColor: "#4DA4F3"}}>
            <View style={{padding:20, paddingTop:80, paddingBottom: 80 }}>
                <TouchableOpacity onPress={ () => props.createNewTask(false) } style={{position:"absolute", right:30, top:50, padding:10}}>
                    <Image
                        source={ CloseBtn }
                        style={{ height:20, width:20 }}
                    />
                </TouchableOpacity>
                
                <Text style={{color:"white", alignSelf:"center", marginTop:30, marginBottom:10, fontSize: 20, fontWeight: "bold"}}>Task title</Text>
                <TextInput
                    onChange={ handleWorkbookName }
                    style={{backgroundColor: "white",
                    height: 40,
                    marginBottom: 20,
                    padding: 10,
                    alignSelf: "stretch",
                    borderColor: "rgba(0,0,0,0.19)",
                    borderWidth: 1,
                    shadowOffset: { width: 0, height: 2},
                    elevation: 4,}}
                />
                
                <Text style={{color:"white", alignSelf:"center", marginTop:30, marginBottom:10, fontSize: 20, fontWeight: "bold"}}>Task description</Text>
                <TextInput
                    multiline = {true}
                    numberOfLines = {3}
                    onChange={ handleWorkbookName }
                    style={{backgroundColor: "white",
                    marginBottom: 20,
                    padding: 10,
                    alignSelf: "stretch",
                    borderColor: "rgba(0,0,0,0.19)",
                    borderWidth: 1,
                    shadowOffset: { width: 0, height: 2},
                    elevation: 4,}}
                />

                <TouchableOpacity onPress={newWorkbook} style={{alignItems: "center", backgroundColor: "#0068C8", padding: 15, marginTop:50}}>
                    <Text style={{color:"white"}}>Create new task</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default TasksModal;