import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { Image, StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Header, Button } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
import { FlatList, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {createStackNavigator} from "@react-navigation/stack";

//SQLite.openDatabase("database") i commented this out bc it wouldnt compile for me

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Stock({ route, navigation }) {
    const { stockName } = route.params;
    const { stockAbbrev } = route.params;
    navigation.setOptions({headerTitle: stockName})
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

class StockListing extends React.Component {
    render () {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.push('Stock', {
                        stockName: this.props.name,
                        stockAbbrev: this.props.abbrev,
                    });
                }}>
                <View style={styles.rowContainer}>
                    <View style={styles.stockNameContainer}>
                        <Text style={styles.stockAbbrev}>{this.props.abbrev}</Text>
                        <Text style={styles.stockName}>{this.props.name}</Text>
                    </View>
                    <View style={styles.stockNameContainer}>
                        <Text style={styles.stockValue}>{this.props.value}</Text>
                        <Text style={styles.stockChange}>▲ {Math.floor(Math.random() * 10)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

class FetchStocks extends React.Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }
    componentDidMount(){
        return fetch('http://localhost:5000/stocks/getall')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function(){
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }
    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return(
            <View style={{flex: 1, paddingTop:20}}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <StockListing abbrev={item.abbrev} name={item.name} value={item.value}/>}
                    keyExtractor={({postID}) => postID}
                />
            </View>
        );
    }
}

function GetStocks ({navigation}) {
    return (
        <FetchStocks/>
    )
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
