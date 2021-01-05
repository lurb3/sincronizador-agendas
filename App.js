import React, { useState } from "react";
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
import Tasks from "./components/Tasks/Tasks";

const client = new ApolloClient({
	uri: process.env.REACT_APP_ADDRESS
});

const initialState = {
	user: '',
	name: '',
	password: '',
	role: ''
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case('UPDATE_USER'):
			return {
				...state,
				user: action.payload.user
			}
		case('UPDATE_NAME'):
			return {
				...state,
				name: action.payload.name 
			}
		case('UPDATE_PASSWORD'):
			return {
				...state,
				password: action.payload.password 
			}
		case('UPDATE_ROLE'):
			return {
				...state,
				role: action.payload.role 
			}
		default:
			return state;
	}
}

const store = createStore(reducer);

export default function App() {
	
	const [getWorkbook, SetGetWorkbook] = useState('testinho')
	return (
		
	<ApolloProvider client={client}>
		<View
		>
			<Provider store={store}>
				<NativeRouter>
					<Route exact path="/" component={
						() => <LoginPage history={ useHistory() } />
					}/>
					<Route exact path="/signup" component={ SignupPage } history={ useHistory() }  />
					<Route exact path="/workbook" component={ Workbook } history={ useHistory() } />
					<Route exact path="/tasks" component={ Tasks }  />
				</NativeRouter>
				
			</Provider>
		</View>
	</ApolloProvider>
	);
}
