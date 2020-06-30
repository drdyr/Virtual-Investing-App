import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { Image, StyleSheet, Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Header, Button } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';


const Tab = createBottomTabNavigator();
SQLite.openDatabase("database")

function Stocks() {
    return (
        <view>

        </view>

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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Text> Overview </Text>

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

});
