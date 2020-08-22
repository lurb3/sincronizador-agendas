import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { Link } from "react-router-native";

const Workbook = (props) => {

    const [data, setData] = useState('');

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
            console.log('ID -> ', props.location.workbook)
    },[])

    return (
        <ScrollView>
            <TouchableOpacity style={{alignSelf:'flex-start', padding: 50}} activeOpacity={0.7}>
                <Link to="/workbook" style={{paddingTop:0}}>
                    <Text>
                        Agendas
                    </Text>
                </Link>
            </TouchableOpacity>
            {
                data !== '' ?
                    data.map((item, index) => {
                        console.log('item', item)
                            
                        return(
                            <TouchableOpacity key={ index } onPress={()=>{
                                props.history.push({pathname: '/tasks', workbook: item.id}) }}>
                                <TouchableOpacity>
                                    <Text>{ item.name }</Text>
                                </TouchableOpacity>
                                <View style={{display: "flex", flexDirection: "row", marginBottom:5}}>
                                    <Text>{ `${item.description}` }</Text>
                                    <Text>{ `${item.id}` }</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                : <Text></Text>
            }            
            
            <View>
                <TouchableOpacity onPress={ () => props.createWorkbook(true) }>
                    <Text style={{color: "#0068C8", fontSize: 15}}>
                        Create new agenda
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    email: state.email,
    password: state.password
})

export default connect(mapStateToProps)(Workbook);