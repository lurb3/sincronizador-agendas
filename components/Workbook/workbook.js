import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import * as AccountStyle from "../Styles/AccountStyles";

import { useQuery } from '@apollo/react-hooks';
import { GET_USERS } from "../Queries";

//const userInfo = useQuery(VIEW_USERS, { variables: { id: 1 }});

const axios = require('axios');

const Workbook = (props) => {
    return (
        <View>
            
        </View>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    email: state.email,
    password: state.password
})

export default connect(mapStateToProps)(Workbook);