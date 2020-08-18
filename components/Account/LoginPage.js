import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text, Button, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "react-router-native";

import * as AccountStyle from "../Styles/AccountStyles";

const LoginPage = (props) => {

    const styles = StyleSheet.create({
        title: {
          ...AccountStyle.title,
        },
        subtitle: {
            ...AccountStyle.title,
            fontWeight: 'normal',
            fontSize: 16
        },
        wrapper: {
            ...AccountStyle.wrapper
        },
        formLabel: {
            ...AccountStyle.formLabel
        },
        formInput: {
            ...AccountStyle.formInput
        },
        formSubmit: {
            ...AccountStyle.formSubmit
        },
        signupLabel: {
            ...AccountStyle.signupLabel
        }
    })

    const updateUserInfo = (input, type) => {
        switch(type) {
            case 'UPDATE_USER' :
                return {
                    type: type,
                    payload: {user: input.nativeEvent.text}
                }
            case 'UPDATE_PASSWORD' :
                return {
                    type: type,
                    payload: {password: input.nativeEvent.text}
                }
        }
    }

    const handleUser = (e) => {
        props.dispatch(updateUserInfo(e, 'UPDATE_USER'))
    }

    const handlePassword = (e) => {
        props.dispatch(updateUserInfo(e, 'UPDATE_PASSWORD'))
    }

    const handleSubmit = (e) => {
        fetch('http://192.168.1.9:4000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({query: `{authUser(user:"${props.user}", password:"${props.password}") {
                status
              }}`})
          })
            .then(r => r.json())
            .then(data => {
                console.log(data.data.authUser.status);
                if(data.data.authUser.status == 'authenticated') {
                    props.history.push('/workbook')
                }
            });
    }

    return (
        <ScrollView contentContainerStyle={styles.wrapper}>
            <View>
                <Text style={styles.title}> Workbook App </Text>
                <Text style={styles.subtitle}>Sign in to workbook </Text>
            </View>

            <Text style={styles.formLabel}>Login</Text>
            <TextInput
                style={styles.formInput}
                onChange={ handleUser }
                value={props.user}
            />

            <Text style={styles.formLabel}>
                Password
            </Text>

            <TextInput
                secureTextEntry={true}
                style={styles.formInput}
                onChange={ handlePassword }
                value={props.password}
            />

            <TouchableOpacity style={{alignItems: "center", backgroundColor: "#0068C8", padding: 15}} activeOpacity={0.7} onPress={ handleSubmit }>
                <Text style={styles.formSubmit}>
                    Sign in
                </Text>
            </TouchableOpacity>
            
            <Link to="/signup">
                <Text style={ styles.signupLabel }>
                    Sign up
                </Text>
            </Link>
        </ScrollView>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    name: state.name,
    password: state.password
})

export default connect(mapStateToProps)(LoginPage);