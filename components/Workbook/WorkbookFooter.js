import React from "react";
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from "react-native";

import * as WorkbookStyles from "../Styles/WorkbookStyles";

import bookIcon from "../../images/workbook/book_icon.png";
import searchIcon from "../../images/workbook/search_icon.png";
import settingsGearIcon from "../../images/workbook/settings_gear_icon.png";

const WorkbookHeader = (props) => {

    const styles = StyleSheet.create({
        footerWrapper: {
          ...WorkbookStyles.footerWrapper,
        },
        footerItemWrapper: {
          ...WorkbookStyles.footerItemWrapper,
        },
    })

    return (
        <View style={styles.footerWrapper}>
            <View style={styles.footerItemWrapper}>
                <Image
                    source = {bookIcon}
                />
                <Text style={{alignSelf:"center"}}> Workbooks </Text>
            </View>

            <View style={styles.footerItemWrapper}>
                <Image
                    source = {searchIcon}
                />
                <Text style={{alignSelf:"center"}}> Search </Text>
            </View>

            <View style={styles.footerItemWrapper}>
                <Image
                    source = {settingsGearIcon}
                />
                <Text style={{alignSelf:"center"}}> Settings </Text>
            </View>
        </View>
    );
}

export default WorkbookHeader;