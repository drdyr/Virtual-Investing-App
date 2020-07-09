import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign} from '@expo/vector-icons';
import { LoginScreen, RegistrationScreen } from './Login-Registration.js'
import { Stocks } from "./Stocks";
import { Overview } from "./Overview";
import { SettingsScreen } from "./Settings";
import {
    LineChart,
    PieChart,
} from "react-native-chart-kit";
//SQLite.openDatabase("database") i commented this out bc it wouldnt compile for me

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default class App extends Component {

    LoginToApp() {
        return (
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Register" component={RegistrationScreen} options={{

                    headerShown: false,
                }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{
                    headerShown: false,
                }} />
            </Stack.Navigator>


        );
    }

    MainApp() {
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
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'Login'}>
                    <Stack.Screen name='Login' component={this.LoginToApp} options={{

                        headerShown: false,
                    }}/>
                    <Stack.Screen name='App' component={this.MainApp} options={{

                        headerShown: false,
                    }}/>

                </Stack.Navigator>
            </NavigationContainer>


        );
    }
}

const styles = StyleSheet.create({


});
