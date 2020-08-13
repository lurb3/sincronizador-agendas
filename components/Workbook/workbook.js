import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import * as AccountStyle from "../Styles/AccountStyles";

import { useQuery } from '@apollo/react-hooks';
import { GET_USERS } from "../Queries";

//const userInfo = useQuery(VIEW_USERS, { variables: { id: 1 }});

const axios = require('axios');

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
        }
      })

    const updateUserInfo = (input, type) => {
        switch(type) {
            case 'UPDATE_USER' :
                return {
                    type: type,
                    payload: {user: input.nativeEvent.text}
                }
            case 'UPDATE_EMAIL' :
                return {
                    type: type,
                    payload: {email: input.nativeEvent.text}
                }
            case 'UPDATE_PASSWORD' :
                return {
                    type: type,
                    payload: {password: input.nativeEvent.text}
                }
        }
    }

    const handleUserName = (e) => {
        props.dispatch(updateUserInfo(e, 'UPDATE_USER'))
    }

    const handleEmail = (e) => {
        props.dispatch(updateUserInfo(e, 'UPDATE_EMAIL'))
    }

    const handlePassword = (e) => {
        props.dispatch(updateUserInfo(e, 'UPDATE_PASSWORD'))
    }

    const handleSubmit = (e) => {
        axios.get('http://192.168.1.6:3000/')
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
        console.log(props);
    }
    
    const getAllUsers = useQuery(GET_USERS);

    return (
        <View style={styles.wrapper}>
            <Text>{JSON.stringify(getAllUsers.data, null, 2)}</Text>
            <View>
                <Text style={styles.title}> Workbook App </Text>
                <Text style={styles.subtitle}>Sign in to workbook </Text>
            </View>

            <Text style={styles.formLabel}>Login</Text>
            <TextInput
                style={styles.formInput}
                onChange={ handleUserName }
                value={props.user}
            />

            <Text style={styles.formLabel}>
                Name
            </Text>
            
            <TextInput
                style={styles.formInput}
                onChange={ handleEmail }
                value={props.email}
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

            <TouchableOpacity style={{alignItems: "center", backgroundColor: "#0068C8", padding: 15}} activeOpacity={0.7}>
                <Text style={styles.formSubmit} onPress={ handleSubmit }>
                    Create account
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    email: state.email,
    password: state.password
})

export default connect(mapStateToProps)(LoginPage);