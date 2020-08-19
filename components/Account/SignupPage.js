import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text, Button, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "react-router-native";

import * as AccountStyle from "../Styles/AccountStyles";

const SignupPage = (props) => {

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
            case 'UPDATE_NAME' :
                return {
                    type: type,
                    payload: {name: input.nativeEvent.text}
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

    const handleName = (e) => {
        props.dispatch(updateUserInfo(e, 'UPDATE_NAME'))
    }

    const handlePassword = (e) => {
        props.dispatch(updateUserInfo(e, 'UPDATE_PASSWORD'))
    }

    const handleSubmit = (e) => {
        fetch('http://192.168.1.6:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: `mutation {createUser(user: "${props.user}", name: "${props.name}", password: "${props.password}")}`})
        })
        .then(r => r.json())
        .then(data => console.log('data returned:', data));
    }

    return (
        <ScrollView contentContainerStyle={styles.wrapper}>
            <View>
                <TouchableOpacity style={{alignSelf:'flex-start', padding: 15}} activeOpacity={0.7}>
                    <Link to="/" style={{paddingTop:0}}>
                        <Text>
                            LOGIN PAGE
                        </Text>
                    </Link>
                </TouchableOpacity>
            </View>
            <View>

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
                    Name
                </Text>
                
                <TextInput
                    style={styles.formInput}
                    onChange={ handleName }
                    value={props.name}
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
                        Create account
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    name: state.name,
    password: state.password
})

export default connect(mapStateToProps)(SignupPage);