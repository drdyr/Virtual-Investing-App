import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { Image, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Header, Button } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import { SearchBar } from 'react-native-elements';


const Tab = createBottomTabNavigator();
//SQLite.openDatabase("database") i commented this out bc it wouldnt compile for me


function GetStocks() {
    // REPLACE THIS CODE WITH GETTING FROM DB

    const stockNames = ["Banana ", "General Developments", "Citizen & Sons", "Vista plc", "Kent ", "Hall plc", "Hayre Utilities", "Butler Securities", "Southeast Oil", "Frontier Insurance", "Petroleum International", "Oil & Gas Holdings", "British Electric", "Anglo Pharmaceuticals", "Admiral Entertainment", "Compass ", "Expert Analytics", "Home Financial", "Imperial Cruiseline", "Intercontinental Airlines", "Global Gas", "BFS Foods", "Upward of Scotland", "Michaelangelo International", "Scott-Barnard plc", "Albert Technologies", "Standard Group", "Remco plc", "RDS Airlines", "Alliance International", "Cove  ", "BLL  ", "Evergreen Royal", "Alpine  ", "LDN Commerce", "New York Oil", "Enterprise Tobacco", "Churchill Hotels Group", "Cameron Industries", "Greyrock Servers", "Cactus ", "Caplin  ", "Lynx Group", "Charger ", "Lavalo & Barker", "Wroting Group", "Stout ", "Executive  Beverages", "Crandink Group", "Parkinson International"]
    const stockAbbrevs = ['BANA', 'GD', 'CNS', 'VSTA', 'KENT', 'HALL', 'HYRU', 'BSEC', 'SEO', 'FRNT', 'PTRI', 'OGH', 'BE', 'APH', 'ADEN', 'CMPS', 'EXAN', 'HOME', 'IMPC', 'ICAL', 'GG', 'BFS', 'UPSC', 'MAIN', 'SB', 'AT', 'STGR', 'RMCO', 'RDS', 'ALIN', 'COVE', 'BLOL', 'EVRG', 'ALPN', 'LDN', 'NYO', 'ENTT', 'CHG', 'CAM', 'GRS', 'CCTS', 'CPLN', 'LYNX', 'CHRG', 'LB', 'WG', 'STWT', 'EXBV', 'DINK', 'PKSI']
    const stocks = []
    let i;
    for (i = 0; i < 50; i++) {
        var tempStock = (
        <TouchableOpacity
            key={i}
            style={styles.button}
            onPress={() => navigation.push()}
        >
            <View style={styles.rowContainer}>
                <View style={styles.stockNameContainer}>
                    <Text style={styles.stockAbbrev}>{stockAbbrevs[i]}</Text>
                    <Text style={styles.stockName}>{stockNames[i]}</Text>
                </View>
                <View style={styles.stockNameContainer}>
                    <Text style={styles.stockValue}>120</Text>
                    <Text style={styles.stockChange}>▲ 10</Text>
                </View>
            </View>
        </TouchableOpacity>
        );
        stocks[i] = (tempStock);
    }
    return (
        <ScrollView style={styles.scrollView} alwaysBounceVertical={true} showsVerticalScrollIndicator={false}>
            <SearchBar
                placeholder="Type Here..."

            />
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
            <View style = {styles.rowContainer} >
                <View style = {styles.overviewContainer} >
                    <Text style = {styles.date} >Value as of xx.xx.xxxx</Text>
                </View>
                <View style = {styles.overviewContainer} >
                    <Text style = {styles.portfolioValue} >Portfolio Value:</Text>
                    <Text style = {styles.portfolioValue} >£100000.00</Text>
                </View>
                <View style = {styles.overviewContainer} >
                    <Button
                        title={"Transaction History"}

                    >

                    </Button>
                </View>
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
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
    },

    button:{
        alignSelf: "stretch",
        height: 100,
        justifyContent: "center",
        backgroundColor: '#004d43',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#018c7a",
    },
    rowContainer:{
        flex: 1,
        flexDirection: 'row',
    },
    stockNameContainer:{
        flex: 3,
        margin: 10,
        flexDirection: 'column',

    },


    stockAbbrev: {
        color: 'white',
        fontSize: 48,
        paddingLeft: 30,
    },
    stockName:{
        color: "white",
        fontSize: 16,
        paddingLeft: 30,
    },
    stockValue:{
        textAlign: 'right',
        color: "#09ab00",
        fontSize: 48,
        paddingRight: 30,
    },
    stockChange:{
        textAlign: 'right',
        color: "#09ab00",
        fontSize: 16,
        paddingRight: 30,
    },

    overviewContainer:{
        flex: 3,
        margin: 10,
        flexDirection: 'column',

    },
    date:{
        textAlign: 'left',
        color: 'black',
        fontSize: 24,
    },
    portfolioValue: {
        textAlign: 'center',
        fontSize: 32,
        color: 'black',
    },
    transactionHistory: {
        textAlign: 'right',

        color: 'black',
    },


});
