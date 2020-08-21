import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";

const Workbook = (props) => {

    useEffect(() => {/*
        fetch('http://192.168.1.15:4000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({query: `{getUserInfo(user: "${props.user}"){id}}`})
          })
            .then(r => r.json())
            .then(data => setUserId(data.data.getUserInfo.id));*/
    },[])

    return (
        <View style={{position:"relative", height:"100%"}}>
            Task List
        </View>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    email: state.email,
    password: state.password
})

export default connect(mapStateToProps)(Workbook);