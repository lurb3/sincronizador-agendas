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

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState('');

    const handleTaskTitle = (e) => {
        setTaskTitle(e.nativeEvent.text);
    }

    const handleTaskDescription = (e) => {
        setTaskDescription(e.nativeEvent.text);
    }

    const handleTaskStatus = (e) => {
        setTaskStatus(e.nativeEvent.text);
    }

    const newTask = () => {
        
        fetch('http://192.168.0.26:4000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({query: `mutation {createTask(name:"${taskTitle}", description:"${taskDescription}", workbook_id:"${props.workbookid}" status:"open")}`})
        })
        .then(r => r.json())
        .then(()=>{
            props.createNewTask(false)
        })
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
                    onChange={ handleTaskTitle }
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
                    onChange={ handleTaskDescription }
                    style={{backgroundColor: "white",
                    marginBottom: 20,
                    padding: 10,
                    alignSelf: "stretch",
                    borderColor: "rgba(0,0,0,0.19)",
                    borderWidth: 1,
                    shadowOffset: { width: 0, height: 2},
                    elevation: 4,}}
                />

                <TouchableOpacity onPress={ newTask } style={{alignItems: "center", backgroundColor: "#0068C8", padding: 15, marginTop:50}}>
                    <Text style={{color:"white"}}>Create new task</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default TasksModal;