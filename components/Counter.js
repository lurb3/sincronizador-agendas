import * as React from "react";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";

const Counter = (props) => {
    const increment = () => {
        props.dispatch({ type: "INCREMENT" })
    }
    
    const decrement = () => {
        props.dispatch({ type: "DECREMENT" })
    }
    return (
    <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <Text>Counter</Text>
        <View>
            <Button onPress={() => increment()} title="Press Me">Press Me</Button>
            <Text>{props.count}</Text>
            <Button onPress={() => decrement()} title="Press Me">Press Me</Button>
        </View>
    </View>
    );
}

const mapStateToProps = (state) => ({
    count: state.count
})

export default connect(mapStateToProps)(Counter);