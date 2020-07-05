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
    const { stockPrice } = route.params;
    const { priceChange } = route.params;

    navigation.setOptions({headerTitle: stockName})
    console.log(route.params)
    return(
        <View style={styles.containerDark}>

            <Text style={styles.stockAbbrev}>{ stockAbbrev }</Text>
            <Text style={styles.stockName}>{ stockName }</Text>
            <Text style={styles.stockName}>{ stockPrice }</Text>
            <Text style={styles.stockName}>{ priceChange }</Text>

        </View>
    );
}

class StockListing extends React.Component {

    determineStockValueStyle () {
        if (this.props.change < 0) {
            return styles.stockValueRed
        } else {
            return styles.stockValueGreen
        }
    }

    determineStockChangeStyle () {
        if (this.props.change < 0) {
            return styles.stockChangeRed
        } else {
            return styles.stockChangeGreen
        }
    }
    determineArrow () {
        if (this.props.change < 0) {
            return '▼'
        } else {
            return '▲'
        }
    }
    render () {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    this.props.navigation.navigation.push('Stock', {
                        stockName: this.props.name,
                        stockAbbrev: this.props.abbrev,
                        stockPrice: this.props.value,
                        priceChange:this.props.change,
                    });
                }}
            >
                <View style={styles.rowContainer}>
                    <View style={styles.stockNameContainer}>
                        <Text style={styles.stockAbbrev}>{this.props.abbrev}</Text>
                        <Text style={styles.stockName}>{this.props.name}</Text>
                    </View>
                    <View style={styles.stockNameContainer}>
                        <Text style={this.determineStockValueStyle()}>{this.props.value}</Text>
                        <Text style={this.determineStockChangeStyle()}>{this.determineArrow()} {this.props.change}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

class FetchStocks extends React.Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true, searchTerm: ""}
        setInterval(this.fetchStockListings, 3000);
    }
    componentDidMount(){
        this.fetchStockListings()
    }

    fetchStockListings = () => {
        fetch('http://localhost:5000/stocks/getall')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function(){
                });
                this.filterArray(this.state.searchTerm)
            })
            .catch((error) =>{
                console.error(error);
            });
    };

    filterArray = (text) => {
        const search = text
        const searchedStocks = [];
        for (const key in this.state.dataSource) {
            if (this.state.dataSource.hasOwnProperty(key)) {
                if (this.state.dataSource[key].name.toLowerCase().includes(search.toLowerCase())) {
                    searchedStocks.push(this.state.dataSource[key])
                }
            }
        }
        this.setState({searchedStocks: searchedStocks})
    }

    updateSearchTerm = (text) => {
        this.setState({
            searchTerm: text,
        })
        this.filterArray(text)
    };

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
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={text => this.updateSearchTerm(text)}
                    value={this.state.searchTerm}
                />
                <FlatList
                    data={this.state.searchedStocks}
                    renderItem={({item}) => <StockListing abbrev={item.abbrev} name={item.name} value={item.value} change={item.change} navigation={this.props.navigation}/>}
                    keyExtractor={({postID}) => postID}
                />
            </View>
        );
    }
}


function GetStocks (navigation) {
    return (
        <FetchStocks navigation={navigation}/>
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
    stockValueRed:{
        textAlign: 'right',
        fontSize: 48,
        paddingRight: 10,
        color: 'red',
    },
    stockValueGreen:{
        textAlign: 'right',
        fontSize: 48,
        paddingRight: 10,
        color: 'green',
    },
    stockChangeRed:{
        textAlign: 'right',
        fontSize: 16,
        paddingRight: 10,
        color: 'red',
    },
    stockChangeGreen:{
        textAlign: 'right',
        fontSize: 16,
        paddingRight: 10,
        color: 'green',
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
    redText: {
        color:'red',
    },
    greenText: {
        color:'green',

    },
});
