import React from "react";
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from "react-native";

import bookIcon from "../../images/workbook/book_icon.png";
import searchIcon from "../../images/workbook/search_icon.png";
import settingsGearIcon from "../../images/workbook/settings_gear_icon.png";

const WorkbookHeader = (props) => {
    return (
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding:20, borderTopWidth: 2, borderTopColor: "rgba(0,0,0,0.1)"}}>
            <View style={{display: "flex", flexDirection: "row"}}>
                <Image
                    source = {bookIcon}
                />
                <Text style={{alignSelf:"center"}}> Workbooks </Text>
            </View>

            <View style={{display: "flex", flexDirection: "row"}}>
                <Image
                    source = {searchIcon}
                />
                <Text style={{alignSelf:"center"}}> Search </Text>
            </View>

            <View style={{display: "flex", flexDirection: "row"}}>
                <Image
                    source = {settingsGearIcon}
                />
                <Text style={{alignSelf:"center"}}> Settings </Text>
            </View>
        </View>
    );
}

export default WorkbookHeader;