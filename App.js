import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign} from '@expo/vector-icons';
import { LoginScreen, RegistrationScreen } from './Login-Registration.js'
import { GetStocks, Stock} from "./Stocks";
import { Portfolio, TransactionHistory} from "./Overview";
//SQLite.openDatabase("database") i commented this out bc it wouldnt compile for me

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
            <View>

            </View>
        )
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

    LoginToApp() {
        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Register" component={RegistrationScreen} options={{

                        headerShown: false,
                    }} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{
                        headerShown: false,
                    }} />
                </Stack.Navigator>
            </NavigationContainer>

        );
    }


    MainApp() {
        return (
            <NavigationContainer independent={true}>
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
                    tabBarOptions={
                        {
                            inactiveBackgroundColor: '#393e42',
                            activeBackgroundColor: '#018c7a',
                            activeTintColor: 'white',
                            inactiveTintColor: 'white',
                            labelPosition: 'below-icon'
                        }

                    }

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
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'Login'}>
                    <Stack.Screen name='Login' component={this.LoginToApp} />
                    <Stack.Screen name='App' component={this.MainApp} />

                </Stack.Navigator>
            </NavigationContainer>


        );
    }
}

const styles = StyleSheet.create({


});
