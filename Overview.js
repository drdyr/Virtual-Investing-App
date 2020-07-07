import React from 'react';
import {Header} from "react-native-elements";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

export function Portfolio({ navigation }){
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = mm + '.' + dd + '.' + yyyy;
    return (
        <Header  containerStyle={styles.header}>
            <View style={styles.overviewContainer} >
                <Text style={styles.date} >{ today }</Text>
            </View>
            <View style={styles.overviewContainer}>
                <Text style={styles.portfolioValue} >£100000.00</Text>
            </View>
            <View style={styles.overviewContainer} >
                <TouchableOpacity style={styles.buttonSmall} onPress={() => navigation.push('Transaction History')}>
                    <MaterialIcons name="history" size={24} color="white"/>
                </TouchableOpacity>
            </View>
        </Header>
    )
}

export function TransactionHistory({ navigation }) {
    return (
        <View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
    },
    buttonSmall:{
        alignSelf: "stretch",
        height: 50,
        justifyContent: "center",
        alignContent: 'center',
    },
    header:{
        height: 65,
        backgroundColor: '#393e42',
        flexDirection: 'row',
        alignItems: 'center',
    },
    touchableLabel:{
        textAlign: 'center',
        color: '#018c7a',
        fontSize: 18,
    },
    overviewContainer:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    portfolioValue: {
        fontSize: 18,
        color: 'white',
        textAlign:'center',
    },
    date: {
        fontSize: 18,
        color: 'white',
        textAlign:'left',
    },

})