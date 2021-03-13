import React, { useState } from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {SearchBar} from "react-native-elements";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {
    LineChart,
    PieChart,
    ContributionGraph,
} from "react-native-chart-kit";
import StockListing from "./StockListing";
import {styles} from "../Styles";
import ListStocks from "./ListStocks";
import Stock from "./Stock";

const Stack = createStackNavigator();


const Stocks = () => { //Stocks tab

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={ListStocks} options={{ //Home stack shows the stocks list
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
export default Stocks;

