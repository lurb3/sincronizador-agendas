import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

import * as AccountStyle from "../Styles/AccountStyles";
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
        axios.get('http://192.168.1.12:3000')
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
        console.log(props);
    }

    return (
        <View style={styles.wrapper}>
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

            <Button color="#0068C8" onPress={ handleSubmit } title="Create account">
            </Button>
        </View>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    email: state.email,
    password: state.password
})

export default connect(mapStateToProps)(LoginPage);