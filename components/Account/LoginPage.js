import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Link } from "react-router-native";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import LoadingIcon from "../../images/loading.gif";

import * as AccountStyle from "../Styles/AccountStyles";

const schema = yup.object().shape({
    login: yup.string().required().min(3),
    password: yup.string().required().min(5),
});

const LoginPage = (props) => {

    const [userFeedback, setUserFeedback] = useState('');
    const [loggedin, setLoggedin] = useState(false);

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
        },
        createdBtn: {
            ...AccountStyle.defaultBtn,
            backgroundColor:"#2CA44B",
            display:"flex",
            flexDirection:"row",
            justifyContent: "center"
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
                    payload: {user: input}
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

    const onSubmit = (data) => {
        axios.post(`http://192.168.1.5:4000/api/users/findUser`, {
            login: data.login,
            password: data.password 
        })
        .then(res => {
            if(res.status !== 200) {
                setUserFeedback("Could not log in")
                return
            }
            setLoggedin(true)
            setTimeout(() => props.history.push('/workbook'),2000)
        })
        .catch(err => {
            if(err.response.data) {
                setUserFeedback(err.response.data)
            } else {
                setUserFeedback("Could not log in")
            }
        })
    };

    useEffect(() => {
        props.dispatch(updateUserInfo('', 'UPDATE_USER'))
        props.dispatch(updateUserInfo('', 'UPDATE_ROLE'))
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.wrapper}>
            <View>
                <Text style={styles.title}>Workbook</Text>
                <Text style={styles.subtitle}>Sign in</Text>
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
                            onChangeText={(text) => {
                                onChange(text)
                                userFeedback !== '' ? setUserFeedback('') : ''
                            }}
                            value={value}
                        />
                    )}
                />
                {errors.login && <Text style={styles.formErrorMessage}>⚠ {errors.login.message}</Text>}

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
                            onChangeText={(text) => {
                                onChange(text)
                                userFeedback !== '' ? setUserFeedback('') : ''
                            }}
                            value={value}
                        />
                    )}
                />
                {errors.password && <Text style={styles.formErrorMessage}>⚠ {errors.password.message}</Text>}

                {
                    loggedin ? 
                        <View style={styles.createdBtn}>
                            <Text style={styles.formSubmit}>✓ Loggin in.</Text>
                            <Image
                                source={ LoadingIcon }
                                style={{width:20, height:20, marginLeft:5}}
                            />
                        </View>
                    :
                        <TouchableOpacity style={styles.defaultBtn} activeOpacity={0.7} onPress={ handleSubmit(onSubmit) }>
                            <Text style={styles.formSubmit}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                }

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