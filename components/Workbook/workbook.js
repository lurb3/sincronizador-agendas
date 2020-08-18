import React from "react";
import { connect } from "react-redux";
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from "react-native";

import WorkbookHeader from "./WorkbookHeader.js";

const Workbook = (props) => {
    return (
        <View>
            <WorkbookHeader/>
        </View>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    email: state.email,
    password: state.password
})

export default connect(mapStateToProps)(Workbook);