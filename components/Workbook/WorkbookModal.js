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

const WorkbookModal = (props) => {

    const [workbookName, setWorkbookName] = useState('');
    const [userTimezone, setUserTimezone] = useState('');
    const [appUsers, setAppUsers] = useState([])
    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [countries, setCountries] = useState([])

    const [displayDate, setDisplayDate] = useState('')
    const [displayHour, setDisplayHour] = useState('')

    const handleWorkbookName = (e) => {
        setWorkbookName(e.nativeEvent.text);
    }

    const newWorkbook = () => {
        
        // Create new agenda and then select agenda's id to match it with the selected users
        fetch('http://192.168.0.26:4000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({query: `mutation {createWorkbook(name:"${workbookName}", date:"${displayDate}", hour:"${displayHour}" timezone:"${userTimezone}")}`})
        })
        .then(r => r.json())
        .then(data => {
        
            fetch('http://192.168.0.26:4000/graphql', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
                body: JSON.stringify({query: `{getWorkbook(name: "${workbookName}"){id}}`})
            })
            .then(r => r.json())
            .then(data => {
                let workbookId = data.data.getWorkbook.id;

                countries.map((item, index) => {
                    fetch('http://192.168.0.26:4000/graphql', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/json',
                        },
                        body: JSON.stringify({query: `{getUserInfo(user: "${item}"){id}}`})
                    })
                    .then(r => r.json())
                    .then(data => {
                        fetch('http://192.168.0.26:4000/graphql', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json',
                            },
                            body: JSON.stringify({query: `mutation {createWorkbookUser(user_id:"${data.data.getUserInfo.id}", workbook_id:"${workbookId}")}`})
                        })
                    })
                })
            })
        })
        
        props.createWorkbook(false);
    }

    const fillAppUsers = () => {
        // Fetching all users and filling dropdown array with corresponding objects
        fetch('http://192.168.0.26:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            body: JSON.stringify({query: `{getUsers {id, user, role}}`})
        })
        .then(r => r.json())
        .then(data => {
            let tempArray = [];

            data.data.getUsers.map((item, index)=>{
                let user = {};
                user['label'] = item.user;
                user['value'] = item.user;
                tempArray.push(user)
            })

            setAppUsers(tempArray);
        });
    }
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShowDatePicker(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    useEffect(()=> {
        let currentTimezone = momentTimezone.tz.guess();

        //Storing user timezone once page loads
        setUserTimezone(currentTimezone)

        fillAppUsers();

    }, [])

    useEffect(() => {
        setDisplayDate(moment(`${date}`).format("DD/MM/YYYY"));
        setDisplayHour(moment(`${date}`).format("H:m"));
    },[date])

    return (
        <ScrollView style={{ display: "flex", flexDirection:"column", minHeight: "100%", width: "100%", backgroundColor: "white"}}>
            <View style={{padding:20, paddingTop:80, paddingBottom: 80, backgroundColor: "#4DA4F3"}}>
                <TouchableOpacity onPress={ () => {props.createWorkbook(false);} } style={{position:"absolute", right:30, top:50, padding:10}}>
                    <Image
                        source={ CloseBtn }
                        style={{ height:20, width:20 }}
                    />
                </TouchableOpacity>
                
                <Text style={{color:"white", alignSelf:"center", marginTop:30, marginBottom:10, fontSize: 20, fontWeight: "bold"}}>New Agenda</Text>
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
            </View>

            <View style={{display: "flex", flexDirection: "column", paddingBottom:60, padding:20, marginTop:20}}>
                <View style={{display: "flex", flexDirection: "row", justifyContent:"space-between", marginBottom:20}}>
                    <View style={{alignSelf: "center", display:"flex", flexDirection:"row"}}>
                        <Image
                            source={ CalendarIcon }
                            style={{width:20, height:20, marginRight:5}}
                        />
                        <Text style={{fontSize:15, fontWeight:"bold", alignSelf:"center"}}>Date</Text>
                    </View>
                    <Text style={{fontSize:15, fontWeight:"bold"}} onPress={showDatepicker}>{ `${displayDate}` }</Text>
                </View>
                <View style={{display: "flex", flexDirection: "row", justifyContent:"space-between", marginBottom:20}}>
                    <View style={{alignSelf: "center", display:"flex", flexDirection:"row"}}>
                        <Image
                            source={ TimeIcon }
                            style={{width:20, height:20, marginRight:5}}
                        />
                        <Text style={{fontSize:15, fontWeight:"bold", alignSelf:"center"}}>Time</Text>
                    </View>
                    <Text style={{fontSize:15, fontWeight:"bold"}} onPress={showTimepicker}>{ `${displayHour}` }</Text>
                </View>
                <View style={{display: "flex", flexDirection: "row", justifyContent:"space-between"}}>
                    <View style={{alignSelf: "center", display:"flex", flexDirection:"row", flexGrow: 1}}>
                        <Image
                            source={ UsersIcon }
                            style={{width:20, height:20, marginRight:5}}
                        />
                        <Text style={{fontSize:15, fontWeight:"bold", alignSelf:"center"}}>Users</Text>
                    </View>
                    <DropDownPicker
                        items={ appUsers }
                        dateFormat="dayofweek day month"
                        multiple={true}
                        multipleText={"%d users selected"}
                        min={0}
                        max={10}
                        defaultValue={"countries"}
                        containerStyle={{height: 40, flexGrow:1}}
                        itemStyle={{
                            justifyContent: 'flex-end',
                            padding:20,
                            height:40
                        }}
                        onChangeItem={item => setCountries(item)}
                        placeholder="Select users"
                    />
                </View>
                

                <TouchableOpacity onPress={newWorkbook} style={{alignItems: "center", backgroundColor: "#0068C8", padding: 15, marginTop:50}}>
                    <Text style={{color:"white"}}>Create new agenda</Text>
                </TouchableOpacity>
            </View>
            {showDatePicker && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
        </ScrollView>
    );
}

export default WorkbookModal;