import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text, Button, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import * as AccountStyle from "../Styles/AccountStyles";

const schema = yup.object().shape({
    login: yup.string().required().min(3),
    name: yup.string().required().min(3),
    password: yup.string().required().min(5),
});

const SignupPage = (props) => {
    const { handleSubmit, control, errors } = useForm({
        resolver: yupResolver(schema)
    });

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
        formError: {
            ...AccountStyle.formError
        },
        formErrorMessage: {
            ...AccountStyle.formErrorMessage
        },
        formSubmit: {
            ...AccountStyle.formSubmit
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
            case 'UPDATE_NAME' :
                return {
                    type: type,
                    payload: {name: input}
                }
            case 'UPDATE_PASSWORD' :
                return {
                    type: type,
                    payload: {password: input}
                }
        }
    }

    const handleUser = (e) => {
        props.dispatch(updateUserInfo(e.nativeEvent.text, 'UPDATE_USER'))
    }

    const handleName = (e) => {
        props.dispatch(updateUserInfo(e.nativeEvent.text, 'UPDATE_NAME'))
    }

    const handlePassword = (e) => {
        props.dispatch(updateUserInfo(e.nativeEvent.text, 'UPDATE_PASSWORD'))
    }

    const handleSub = (e) => {
        fetch(process.env.REACT_APP_ADDRESS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: `mutation {createUser(user: "${props.user}", name: "${props.name}", password: "${props.password}")}`})
        })
        .then(r => r.json())
        .then(data => props.history.push('/'));
    }

    const onSubmit = (data) => {
        fetch(process.env.REACT_APP_ADDRESS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: `mutation {createUser(user: "${data.login}", name: "${data.name}", password: "${data.password}")}`})
        })
        .then(r => r.json())
        .then(data => props.history.push('/'));
    };

    useEffect(() => {
        props.dispatch(updateUserInfo('', 'UPDATE_USER'))
        props.dispatch(updateUserInfo('', 'UPDATE_NAME'))
        props.dispatch(updateUserInfo('', 'UPDATE_PASSWORD'))
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.wrapper}>
            <View>
                <Link component={TouchableOpacity} to="/">
                    <Text style={{fontWeight:"bold", fontSize:15,  padding:10}}>
                        &lt; Login page
                    </Text>
                </Link>
            </View>
            
            <View>
                <Text style={styles.title}> Workbook App </Text>
                <Text style={styles.subtitle}>Sign in to workbook </Text>
            </View>

            <View style={{marginTop:"auto", marginBottom:"auto"}}>
                <Text style={styles.formLabel}>Login</Text>
                <Controller
                    name="login"
                    control={control}
                    defaultValue=""
                    render={({ onChange, value }) => (
                        <TextInput
                            style={errors.login ? styles.formError : styles.formInput}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                        />
                    )}
                />
                {errors.login && <Text style={styles.formErrorMessage}>⚠ {errors.login.message}</Text>}
                {/*<TextInput
                    style={styles.formInput}
                    onChange={ handleUser }
                    value={props.user}
                />*/}

                <Text style={styles.formLabel}>
                    Name
                </Text>
                
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ onChange, value }) => (
                        <TextInput
                            style={errors.name ? styles.formError : styles.formInput}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                        />
                    )}
                />
                {errors.name && <Text style={styles.formErrorMessage}>⚠ {errors.name.message}</Text>}

                <Text style={styles.formLabel}>
                    Password
                </Text>

                
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ onChange, value }) => (
                        <TextInput
                        secureTextEntry={true}
                            style={errors.password ? styles.formError : styles.formInput}
                            onChangeText={(text) => onChange(text)}
                            value={value}
                        />
                    )}
                />
                {errors.password && <Text style={styles.formErrorMessage}>⚠ {errors.password.message}</Text>}

                <TouchableOpacity style={styles.defaultBtn} activeOpacity={0.7} onPress={ handleSubmit(onSubmit) }>
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