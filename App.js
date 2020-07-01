import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { Image, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { Header, Button } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
SQLite.openDatabase("database")


function GetStocks() {
    // REPLACE THIS CODE WITH GETTING FROM DB
    const stocks = []
    let i;
    for (i = 0; i < 51; i++) {
        var tempStock = (
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push()}
        >
            <View style={styles.stockContainer}>
                <View style={styles.stockNameContainer}>
                    <Text style={styles.stockAbbrev}>STCK</Text>
                    <Text style={styles.stockName}>Stock {i}</Text>
                </View>
                <View style={styles.stockNameContainer}>
                    <Text style={styles.stockValue}>120</Text>
                    <Text style={styles.stockChange}>▲ 10</Text>
                </View>
            </View>
        </TouchableOpacity>);
        stocks[i] = (tempStock);
    }
    return (
        <ScrollView style={styles.scrollView} alwaysBounceVertical={true} showsVerticalScrollIndicator={false}>
            {stocks}
        </ScrollView>
    );
}

function Stocks() {
    return (
        <SafeAreaView style={styles.container}>
                <GetStocks />
        </SafeAreaView>

    );
}

function SettingsScreen() {
    return (
        <View

        />
    );
}

function Overview() {
    return (
        <View>

        </View>
    );
}


export default class App extends Component {

    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName={ 'Overview' }
                    screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;

                            if (route.name === 'Overview') {
                                iconName = focused ? 'linechart' : 'linechart';
                            } else if (route.name === 'Stocks') {
                                iconName = focused ? 'search1' : 'search1';
                            } else if (route.name === 'Settings') {
                                iconName = focused ? 'setting' : 'setting';
                            }

                            return <AntDesign name={iconName} size={size} color={color}/>;
                        },
                    })}
                    tabBarOptions={{
                        inactiveBackgroundColor: 'white',
                        activeBackgroundColor: '#018c7a',
                        activeTintColor: 'white',
                        inactiveTintColor: 'black',
                        labelPosition: 'below-icon'
                    }}

                >

                    <Tab.Screen
                        name="Stocks"
                        component={Stocks}
                    />
                    <Tab.Screen
                        name="Overview"
                        component={Overview}
                    />
                    <Tab.Screen
                        name="Settings"
                        component={SettingsScreen}
                    />
                </Tab.Navigator>
            </NavigationContainer>);

    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',},

    button:{
        alignSelf: "stretch",
        height: 100,
        justifyContent: "center",
        backgroundColor: '#018c7a',
        borderWidth: 1,
        borderColor: "white",
        },
    stockContainer:{
        flex: 1,
        flexDirection: 'row',
    },
    stockNameContainer:{
        flex: 3,
        margin: 10,
        flexDirection: 'column',
    },
    stockValueContainer:{
        flex: 1,
        margin: 10,
        textAlignVertical: 'center',
        flexDirection: 'column',
    },
    stockAbbrev: {
        color: 'white',
        fontSize: 48,
    },
    stockName:{
        color: "white",
        fontSize: 16,
    },
    stockValue:{
        textAlign: 'right',
        color: "green",
        fontSize: 48,
    },
    stockChange:{
        textAlign: 'right',
        color: "green",
        fontSize: 16,
    }
});
