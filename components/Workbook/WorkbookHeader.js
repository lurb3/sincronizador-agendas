import React from "react";
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "react-router-native";

import addButton from "../../images/add_button.png";
import settingsButton from "../../images/settings_button.png";

const WorkbookHeader = (props) => {
    return (
        <View style={{padding:20, paddingBottom:10, paddingTop:30, borderBottomWidth: 2, borderBottomColor: "rgba(0,0,0,0.1)"}}>
            <Link to="/" style={{paddingTop:0}}>
                <Text>
                    Logout
                </Text>
            </Link>
            <View style={{width:"100%", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop:10}}>
                <Text style={{fontSize:20}}>
                    Workbook
                </Text>
                <View style={{display: "flex", flexDirection: "row"}}>
                    
                <TouchableOpacity>
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

export default WorkbookHeader;