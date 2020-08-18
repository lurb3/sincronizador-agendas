import React from "react";
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import * as WorkbookStyles from "../Styles/WorkbookStyles";

import bookIcon from "../../images/workbook/book_icon.png";

const WorkbookList = (props) => {

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
            <View style={styles.listItem}>
                <Image
                    source={bookIcon}
                    style={{marginRight: 10}}
                />
                <TouchableOpacity>
                    <Text style={styles.workbookFontSize}>Website (Gustavo)</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.listItem}>
                <Image
                    source={bookIcon}
                    style={{marginRight: 10}}
                />
                <TouchableOpacity>
                    <Text style={styles.workbookFontSize}>Agenda (Gustavo)</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.listItem}>
                <Image
                    source={bookIcon}
                    style={{marginRight: 10}}
                />
                <TouchableOpacity>
                    <Text style={styles.workbookFontSize}>Plataforma Online (Gustavo)</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.listNewItemText}>
                <TouchableOpacity>
                    <Text style={{color: "#0068C8", fontSize: 20}}>
                        Criar novo workbook
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default WorkbookList;