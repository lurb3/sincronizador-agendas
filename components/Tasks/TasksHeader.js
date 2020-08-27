import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "react-router-native";

import * as WorkbookStyles from "../Styles/WorkbookStyles";

import addButton from "../../images/workbook/add_button.png";
import settingsButton from "../../images/workbook/settings_button.png";

const TasksHeader = (props) => {

    const styles = StyleSheet.create({
        headerWrapper: {
          ...WorkbookStyles.headerWrapper,
        },
        header: {
          ...WorkbookStyles.header,
        },
        headerIconWrapper: {
          ...WorkbookStyles.headerIconWrapper,
        },
        workbookFontSize: {
          ...WorkbookStyles.workbookFontSize,
        },
    })

    return (
        <View style={styles.headerWrapper}>
            <Link to="/workbook" style={{paddingTop:0}}>
                <Text>
                    Agendas
                </Text>
            </Link>
            <View style={styles.header}>
                <Text style={{fontSize:20}}>
                    Tasks
                </Text>
                <View style={styles.headerIconWrapper}>   
                    <TouchableOpacity onPress={()=>{props.createNewTask(true)}}>
                        <Image
                            source={addButton}
                            style={{marginRight:20}}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Image
                            source={settingsButton}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default TasksHeader;