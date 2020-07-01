import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { Image, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Header, Button } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import { SearchBar } from 'react-native-elements';
import {createStackNavigator} from "@react-navigation/stack";
import * as FileSystem from "expo-file-system";
import * as Asset from "expo-asset";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
//SQLite.openDatabase("database") i commented this out bc it wouldnt compile for me

let db = SQLite.openDatabase("db");

async function database() {
    let dirInfo;
    try {
        dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`);
    } catch(err) { console.log("dir exists") };
    if (!dirInfo.exists) {
        try {
            await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });
        } catch(err) { consoel.log("could not create dir") }
    };
    console.log()
    await FileSystem.downloadAsync(
        Asset.fromModule(require('/assets/db/db.db')).uri,
        FileSystem.documentDirectory + 'SQLite/db.db'
    ).then(({ uri }) => {
        console.log('Finished downloading to ', uri)
    })
        .catch(error => {
            console.error(error);
        })
    db = SQLite.openDatabase("db")
}

function GetStocks({ navigation }) {
    // REPLACE THIS CODE WITH GETTING FROM DB

    const stockNames = ["Banana ", "General Developments", "Citizen & Sons", "Vista plc", "Kent ", "Hall plc", "Hayre Utilities", "Butler Securities", "Southeast Oil", "Frontier Insurance", "Petroleum International", "Oil & Gas Holdings", "British Electric", "Anglo Pharmaceuticals", "Admiral Entertainment", "Compass ", "Expert Analytics", "Home Financial", "Imperial Cruiseline", "Intercontinental Airlines", "Global Gas", "BFS Foods", "Upward of Scotland", "Michaelangelo International", "Scott-Barnard plc", "Albert Technologies", "Standard Group", "Remco plc", "RDS Airlines", "Alliance International", "Cove  ", "BLL  ", "Evergreen Royal", "Alpine  ", "LDN Commerce", "New York Oil", "Enterprise Tobacco", "Churchill Hotels Group", "Cameron Industries", "Greyrock Servers", "Cactus ", "Caplin  ", "Lynx Group", "Charger ", "Lavalo & Barker", "Wroting Group", "Stout ", "Executive  Beverages", "Crandink Group", "Parkinson International"]
    const stockAbbrevs = ['BANA', 'GD', 'CNS', 'VSTA', 'KENT', 'HALL', 'HYRU', 'BSEC', 'SEO', 'FRNT', 'PTRI', 'OGH', 'BE', 'APH', 'ADEN', 'CMPS', 'EXAN', 'HOME', 'IMPC', 'ICAL', 'GG', 'BFS', 'UPSC', 'MAIN', 'SB', 'AT', 'STGR', 'RMCO', 'RDS', 'ALIN', 'COVE', 'BLOL', 'EVRG', 'ALPN', 'LDN', 'NYO', 'ENTT', 'CHG', 'CAM', 'GRS', 'CCTS', 'CPLN', 'LYNX', 'CHRG', 'LB', 'WG', 'STWT', 'EXBV', 'DINK', 'PKSI']
    const stocks = []
    let i;
    for (i = 0; i < 50; i++) {
        const name = stockNames[i];
        const abbrev = stockAbbrevs[i];
        const tempStock = (
            <TouchableOpacity
                key={i}
                style={styles.button}
                onPress={() => {
                    navigation.push('Stock', {
                        stockName: name,
                        stockAbbrev: abbrev,
                    });
                }}
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
        <View style={styles.container}>
        <ScrollView style={styles.scrollView} alwaysBounceVertical={true} showsVerticalScrollIndicator={false}>
            <SearchBar
                placeholder="Type Here..."
            />
            {stocks}
        </ScrollView>
        </View>
    );
}

function Stock({ route, navigation }) {
    const { stockName } = route.params;
    const { stockAbbrev } = route.params;
    console.log(route.params)
    return(
        <View>
            <Button
                title= "Go back"
                onPress={() =>
                    navigation.pop()
                }
            />
            <Text>{ stockName }</Text>
            <Text>{ stockAbbrev }</Text>
        </View>
    );
}

function Stocks() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={GetStocks} options={{
                headerShown: false,
            }}/>
            <Stack.Screen name="Stock" component={Stock} options={{
                headerTitle: '',
                headerStyle:  {
                    backgroundColor: '#393e42',
                },
                headerTintColor: 'white',
            }}/>
        </Stack.Navigator>
    );
}

function SettingsScreen() {
    database().then(r => console.log("TTT")
    )

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
                <Text style = {styles.portfolioValue} >Value:</Text>
                <Text style = {styles.portfolioValue} >£100000.00</Text>
            </View>
            <View style = {styles.overviewContainer} >
                <TouchableOpacity style={styles.buttonSmall}>
                    <Text style={styles.touchableLabel}>Transaction History</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}



export default class App extends Component {

    render() {
        return (
            <NavigationContainer>
                <StatusBar hidden />
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
                        inactiveBackgroundColor: '#393e42',
                        activeBackgroundColor: '#018c7a',
                        activeTintColor: 'white',
                        inactiveTintColor: 'white',
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
        backgroundColor: '#004d43',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#018c7a",
        },
    buttonSmall:{
        alignSelf: "stretch",
        height: 50,
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
    stockValueContainer:{
        flex: 1,
        margin: 10,
        textAlignVertical: 'center',
        flexDirection: 'column',
    },
    stockAbbrev: {
        color: 'white',
        fontSize: 48,
        paddingLeft: 10,
    },
    stockName:{
        color: "white",
        fontSize: 16,
        paddingLeft: 10,
    },
    stockValue:{
        textAlign: 'right',
        color: "#09ab00",
        fontSize: 48,
        paddingRight: 10,
    },
    stockChange:{
        textAlign: 'right',
        color: "#09ab00",
        fontSize: 16,
        paddingRight: 10,
    },
    touchableLabel:{
        textAlign: 'center',
        color: "white",
        fontSize: 18,
    },
    overviewContainer:{
        flex: 3,
        margin: 10,
        flexDirection: 'column',
    },
    portfolioValue: {
        fontSize: 18,
        color: 'black',
        textAlign:'center',

    },
    date: {
        fontSize: 18,
        color: 'black',
        textAlign:'left',

    },
});
