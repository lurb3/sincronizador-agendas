import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, Vibration } from "react-native";
import moment from 'moment';

import * as WorkbookStyles from "../Styles/WorkbookStyles";

import CalendarIcon from "../../images/calendar_icon.png";
import TimeIcon from "../../images/time_icon.png";

const WorkbookList = (props) => {

    const [data, setData] = useState('')

    useEffect(() => {
        props.data !== '' ? setData(props.data) : ''
    }, [props.data])

    const styles = StyleSheet.create({
        listWrapper: {
          ...WorkbookStyles.listWrapper,
        },
        itemsWrapper: {
          ...WorkbookStyles.itemsWrapper,
        },
        workbookFontSize: {
          ...WorkbookStyles.workbookFontSize,
        },
        listNewItemText: {
          ...WorkbookStyles.listNewItemText,
        },
    })

    return (
        <ScrollView style={styles.listWrapper}>
            {
                data !== '' ?
                    data.map((item, index) => {
                            return(
                                <TouchableOpacity 
                                    key={ index } 
                                    style={styles.itemsWrapper} 
                                    onPress={()=>{
                                        props.history.push({pathname: '/tasks', workbook: item.id});
                                        Vibration.vibrate(10)
                                    }}
                                    onLongPress={()=>{Vibration.vibrate(50)}}
                                >
                                    <Text style={styles.workbookFontSize}>{ item.name }</Text>
                                    <View style={{display: "flex", flexDirection: "row", marginBottom:5}}>
                                        <Image
                                            source={ CalendarIcon }
                                            style={{width:20, height:20, marginRight:5}}
                                        />
                                        <Text>{ `${item.date}` }</Text>

                                        
                                        <Image
                                            source={ TimeIcon }
                                            style={{width:20, height:20, marginLeft:5, marginRight:5}}
                                        />
                                        <Text>{ `${item.hour}` }</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                    })
                : <Text></Text>
            }            
            
            <View style={styles.listNewItemText}>
                <TouchableOpacity onPress={ () => props.createWorkbook(true) }>
                    <Text style={{color: "#0068C8", fontSize: 15}}>
                        Create new agenda
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default WorkbookList;