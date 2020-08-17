import * as React from "react";
import { View, Text, Button } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { NativeRouter, Route, Link } from "react-router-native";
import { useHistory } from "react-router-dom";

// Components
import LoginPage from "./components/Account/LoginPage";
import SignupPage from "./components/Account/SignupPage";
import Workbook from "./components/Workbook/Workbook";

const client = new ApolloClient({
	uri: 'http://192.168.1.20:4000/graphql'
});

const initialState = {
	user: '',
	email: '',
	password: ''
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case('UPDATE_USER'):
			return {
				...state,
				user: action.payload.user 
			}
		case('UPDATE_EMAIL'):
			return {
				...state,
				email: action.payload.email 
			}
		case('UPDATE_PASSWORD'):
			return {
				...state,
				password: action.payload.password 
			}
		default:
			return state;
	}
}

const store = createStore(reducer);

export default function App() {
  return (
	  
  <ApolloProvider client={client}>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
		<Provider store={store}>
			<NativeRouter>
				<Route exact path="/" component={
					() => <LoginPage history={ useHistory() } />
				}/>
				<Route exact path="/signup" component={ SignupPage }  />
				<Route exact path="/workbook" component={ Workbook }  />
			</NativeRouter>
			
		</Provider>
    </View>
  </ApolloProvider>
  );
}
