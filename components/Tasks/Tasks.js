import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import * as WorkbookStyles from "../Styles/WorkbookStyles";
import TasksHeader from "./TasksHeader";
import TasksList from "./TasksList";
import TasksModal from "./TasksModal";

const Workbook = (props) => {

    const [data, setData] = useState('');
    const [showModal, setShowModal] = useState(false);

    const styles = StyleSheet.create({
        listWrapper: {
          ...WorkbookStyles.listWrapper,
        },
        itemsWrapper: {
          ...WorkbookStyles.itemsWrapper,
        },
        workbookFontSize: {
          ...WorkbookStyles.workbookFontSize,
        },
        listNewItemText: {
          ...WorkbookStyles.listNewItemText,
        },
    })

    useEffect(() => {
        fetch('http://192.168.1.16:4000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({query: `{getTasks(workbook_id: "${props.location.workbook}"){id,name, description}}`})
          })
            .then(r => r.json())
            .then(data => setData(data.data.getTasks));
    },[])

    return (
        <View>
        {
            !showModal ?
                <View>
                    <TasksHeader createNewTask={ setShowModal }/>
                    <TasksList styles={ styles } data={ data } createNewTask={ setShowModal }/>
                </View>
            :
                <View>
                    <TasksModal createNewTask={ setShowModal }/>
                </View>
        }
        </View>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    email: state.email,
    password: state.password
})

export default connect(mapStateToProps)(Workbook);