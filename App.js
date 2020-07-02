import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { Image, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Header, Button } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import { SearchBar } from 'react-native-elements';
import {createStackNavigator} from "@react-navigation/stack";

//SQLite.openDatabase("database") i commented this out bc it wouldnt compile for me

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Stock({ route, navigation }) {
    const { stockName } = route.params;
    const { stockAbbrev } = route.params;
    navigation.setOptions({headerTitle: stockName})
    console.log(route.params)
    return(
        <View style={styles.containerDark}>
            {/* <Button
                title= "Go back"
                onPress={() =>
                    navigation.pop()
                }
            /> */}
            <Text style={styles.stockAbbrev}>{ stockAbbrev }</Text>
            <Text style={styles.stockName}>{ stockName }</Text>
        </View>
    );
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
                        <Text style={styles.stockValue}>{Math.floor(Math.random() * 100)}</Text>
                        <Text style={styles.stockChange}>▲ {Math.floor(Math.random() * 10)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
        stocks[i] = (tempStock);
    }
    return (
        <View style={styles.stockscontainer}>
            <SearchBar
                placeholder="Type Here..."
            />
            <ScrollView style={styles.scrollView} alwaysBounceVertical={true} showsVerticalScrollIndicator={false}>
                {stocks}
            </ScrollView>
        </View>
    );
}

function Portfolio({ navigation }){
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

function TransactionHistory({ navigation }) {
    return (
        <View>

        </View>
    )
}
export default class App extends Component {


    Stocks() { //Stocks tab
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={GetStocks} options={{ //Home stack shows the stocks list
                    headerShown: false,
                }} />
                <Stack.Screen name="Stock" component={Stock} options={{ //Each stock has a page that goes on top of the stack
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: '#393e42',
                    },
                    headerTintColor: 'white',
                }} />
            </Stack.Navigator>
        );
    }

    SettingsScreen() { //Settings tab
        return (
            <View

            />
        );
    }

    Overview() { //Overview tab
        return (
            <Stack.Navigator>
                <Stack.Screen name="Overview" component={Portfolio} options = {{
                    headerShown: false,
                }} />
                <Stack.Screen name="Transaction History" component={TransactionHistory} options = {{

                }} />
            </Stack.Navigator>
        );
    }

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
                        component={this.Stocks}
                    />
                    <Tab.Screen
                        name="Overview"
                        component={this.Overview}
                    />
                    <Tab.Screen
                        name="Settings"
                        component={this.SettingsScreen}
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
    stockscontainer: {
        flex: 1,
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
        fontSize: 14,
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
    containerDark: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        backgroundColor: '#004d43',
    },
    date: {
        fontSize: 18,
        color: 'white',
        textAlign:'left',
    },
});
