import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text, Button, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "react-router-native";

import * as AccountStyle from "../Styles/AccountStyles";

const LoginPage = (props) => {

    const [userFeedback, setUserFeedback] = useState('');

    const styles = StyleSheet.create({
        title: {
          ...AccountStyle.title,
        },
        subtitle: {
            ...AccountStyle.subtitle,
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
        },
        defaultBtn: {
            ...AccountStyle.defaultBtn
        }
    })

    const updateUserInfo = (input, type) => {
        switch(type) {
            case 'UPDATE_USER' :
                return {
                    type: type,
                    payload: {user: input}
                }
            case 'UPDATE_PASSWORD' :
                return {
                    type: type,
                    payload: {password: input}
                }
            case 'UPDATE_ROLE' :
                return {
                    type: type,
                    payload: {role: input}
                }
        }
    }

    const handleUser = (e) => {
        props.dispatch(updateUserInfo(e.nativeEvent.text, 'UPDATE_USER'))
    }

    const handlePassword = (e) => {
        props.dispatch(updateUserInfo(e.nativeEvent.text, 'UPDATE_PASSWORD'))
    }

    const handleSubmit = (e) => {
        fetch(process.env.REACT_APP_ADDRESS, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({query: `{authUser(user:"${props.user}", password:"${props.password}") {
                status, role
              }}`})
          })
            .then(r => r.json())
            .then(data => {
                if(data.data.authUser.status == 'authenticated') {
                    setUserFeedback("")
                    props.dispatch(updateUserInfo(data.data.authUser.role, 'UPDATE_ROLE'))
                    props.history.push('/workbook')
                } else {
                    setUserFeedback("Invalid login or password")
                }
            });
    }

    useEffect(() => {
        props.dispatch(updateUserInfo('', 'UPDATE_USER'))
        props.dispatch(updateUserInfo('', 'UPDATE_PASSWORD'))
        props.dispatch(updateUserInfo('', 'UPDATE_ROLE'))
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.wrapper}>
            <View>
                <Text style={styles.title}> Workbook App </Text>
                <Text style={styles.subtitle}>Sign in to workbook </Text>
            </View>

            <View style={{marginTop:"auto", marginBottom:"auto"}}>
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

                <TouchableOpacity style={styles.defaultBtn} activeOpacity={0.7} onPress={ handleSubmit }>
                    <Text style={styles.formSubmit}>
                        Sign in
                    </Text>
                </TouchableOpacity>

                <Text style={{textAlign:"right", color:"red", textAlign:"center"}}>{ userFeedback }</Text>
                
                <Link component={TouchableOpacity} to="/signup">
                    <Text style={ styles.signupLabel }>
                        Sign up
                    </Text>
                </Link>
            </View>
        </ScrollView>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    name: state.name,
    password: state.password,
    role: state.role
})

export default connect(mapStateToProps)(LoginPage);