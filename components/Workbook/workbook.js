import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";

import WorkbookHeader from "./WorkbookHeader.js";
import WorkbookList from "./WorkbookList.js";
import WorkbookFooter from "./WorkbookFooter.js";

const Workbook = (props) => {
    return (
        <View style={{position:"relative", height:"100%"}}>
            <WorkbookHeader/>
            <WorkbookList/>
            <WorkbookFooter/>
        </View>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    email: state.email,
    password: state.password
})

export default connect(mapStateToProps)(Workbook);