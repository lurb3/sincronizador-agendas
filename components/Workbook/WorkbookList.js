import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import moment from 'moment';

import * as WorkbookStyles from "../Styles/WorkbookStyles";

import bookIcon from "../../images/workbook/book_icon.png";

const WorkbookList = (props) => {

    const [data, setData] = useState('')

    useEffect(() => {
        props.data !== '' ? setData(props.data) : ''
    }, [props.data])

    const styles = StyleSheet.create({
        listWrapper: {
          ...WorkbookStyles.listWrapper,
        },
        listItem: {
          ...WorkbookStyles.listItem,
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
                                <View key={ index }>
                                    <View style={{marginBottom:5}}>
                                        <Text>{ moment.unix(`${item.date}`).format("MM/DD/YYYY H:m") }</Text>
                                    </View>
                                    <View style={styles.listItem}>
                                        <Image
                                            source={bookIcon}
                                            style={{marginRight: 10}}
                                        />
                                        <TouchableOpacity>
                                            <Text style={styles.workbookFontSize}>{ item.name }</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                    })
                : <Text></Text>
            }            
            
            <View style={styles.listNewItemText}>
                <TouchableOpacity>
                    <Text style={{color: "#0068C8", fontSize: 15}}>
                        Criar novo workbook
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default WorkbookList;