import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";

const Workbook = (props) => {

    useEffect(() => {
        fetch('http://192.168.1.15:4000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({query: `{getTasks{id,name, description}}`})
          })
            .then(r => r.json())
            .then(data => console.log(data));
            console.log('ID -> ', props.location.workbook)
    },[])

    return (
        <View style={{position:"relative", height:"100%"}}>
            <Text>Task List</Text>
        </View>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    email: state.email,
    password: state.password
})

export default connect(mapStateToProps)(Workbook);