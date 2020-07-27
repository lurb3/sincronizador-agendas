import * as React from "react";
import { View, Text, Button } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";

// Components
import Counter from "./components/Counter";
import LoginPage from "./components/LoginPage";

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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
		<Provider store={store}>
			<LoginPage />
		</Provider>
    </View>
  );
}
