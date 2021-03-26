import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign} from '@expo/vector-icons';
import { LoginScreen, RegistrationScreen } from './Components/Registration.js'
import Login from "./Components/Login";
import Stocks from "./Components/Stocks";
import Overview from "./Components/Overview";
import SettingsScreen from "./Components/Settings";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {

    const LoginToApp = () => {
        return (
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Register" component={RegistrationScreen} options={{

                    headerShown: false,
                }} />
                <Stack.Screen name="Login" component={Login} options={{
                    headerShown: false,
                }} />
            </Stack.Navigator>


        );
    }

    const MainApp = () => {
        return (
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
            )
    }

    return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'Login'}>
                    <Stack.Screen name='Login' component={LoginToApp} options={{

                        headerShown: false,
                    }}/>
                    <Stack.Screen name='App' component={MainApp} options={{

                        headerShown: false,
                    }}/>

                </Stack.Navigator>
            </NavigationContainer>


    );
}

export default App;
