import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, Button, TextInput } from "react-native";
const axios = require('axios');

const LoginPage = (props) => {

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
        console.log(props);
    }

    useEffect(() => {
        fetch('localhost:3000')
            .then(response => response.json())
            .then(commits => alert(commits[0].author.login));
    }, [])

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    fontSize: 30,
                    color: "red",
                    marginBottom: 40
                }}
            >
                Sincronizador de Agendas
            </Text>

            <Text>Nome de utilizador:</Text>
            <TextInput
                style={{ height: 40, marginBottom: 20, alignSelf: 'stretch', borderColor: 'gray', borderWidth: 1 }}
                onChange={ handleUserName }
                value={props.user}
            />

            <Text>Email:</Text>
            <TextInput
                style={{ height: 40, marginBottom: 20, alignSelf: 'stretch', borderColor: 'gray', borderWidth: 1 }}
                onChange={ handleEmail }
                value={props.email}
            />

            <Text>Password:</Text>
            <TextInput
                secureTextEntry={true}
                style={{ height: 40, alignSelf: 'stretch', borderColor: 'gray', borderWidth: 1 }}
                onChange={ handlePassword }
                value={props.password}
            />

            <Button onPress={ handleSubmit } title="Submit">Submit</Button>
        </View>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    email: state.email,
    password: state.password
})

export default connect(mapStateToProps)(LoginPage);