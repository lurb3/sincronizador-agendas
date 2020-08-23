import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Vibration } from "react-native";
import { Link } from "react-router-native";
import addButton from "../../images/workbook/add_button.png";
import settingsButton from "../../images/workbook/settings_button.png";

const TasksList = (props) => {

    return (
        <ScrollView style={ props.styles.listWrapper }>
            {
                props.data !== '' ?
                    props.data.map((item, index) => {                            
                        return(
                            <TouchableOpacity
                                style={ props.styles.itemsWrapper } 
                                key={ index } 
                                onPress={()=>{
                                    //props.history.push({pathname: '/tasks', workbook: item.id});
                                    Vibration.vibrate(10)
                                }}
                                onLongPress={()=>{Vibration.vibrate(50)}}
                            >
                                <Text style={ props.styles.workbookFontSize }>{ item.name }</Text>
                                <View style={{display: "flex", flexDirection: "row", marginBottom:5}}>
                                    <Text>{ `${item.description}` }</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                : <Text></Text>
            }            
            
            <View>
                <TouchableOpacity onPress={ () => props.createNewTask(true) }>
                    <Text style={{color: "#0068C8", fontSize: 15}}>
                        Create new Task
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default TasksList;