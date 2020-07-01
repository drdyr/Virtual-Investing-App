import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { Image, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Header, Button } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';


const Tab = createBottomTabNavigator();
//SQLite.openDatabase("database") i commented this out bc it wouldnt compile for me

function GetStocks() {
    // REPLACE THIS CODE WITH GETTING FROM DB

    stockNames = ["Banana ", "General Developments", "Citizen & Sons", "Vista plc", "Kent ", "Hall plc", "Hayre Utilities", "Butler Securities", "Southeast Oil", "Frontier Insurance", "Petroleum International", "Oil & Gas Holdings", "British Electric", "Anglo Pharmaceuticals", "Admiral Entertainment", "Compass ", "Expert Analytics", "Home Financial", "Imperial Cruiseline", "Intercontinental Airlines", "Global Gas", "BFS Foods", "Upward of Scotland", "Michaelangelo International", "Scott-Barnard plc", "Albert Technologies", "Standard Group", "Remco plc", "RDS Airlines", "Alliance International", "Cove  ", "BLL  ", "Evergreen Royal", "Alpine  ", "LDN Commerce", "New York Oil", "Enterprise Tobacco", "Churchill Hotels Group", "Cameron Industries", "Greyrock Servers", "Cactus ", "Caplin  ", "Lynx Group", "Charger ", "Lavalo & Barker", "Wroting Group", "Stout ", "Executive  Beverages", "Crandink Group", "Parkinson International"]

    const stocks = []
    let i;
    for (i = 0; i < 50; i++) {
        var tempStock = (
        <TouchableOpacity
            style={styles.button}
        >
            <Text style={styles.buttonText}>{stockNames[i]}</Text>
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
    buttonText:{
        color: "white",
        alignSelf: 'center',
        fontSize: 25,
    }
});
