import React from 'react';
import { Header, SearchBar } from "react-native-elements";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    FlatList
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import {
    LineChart,
    PieChart,
    ContributionGraph,
} from "react-native-chart-kit";

const SettingsScreen = ({navigation}) => { //Settings tab
    return (
        <View>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Login', {screen: 'Overview'})
            }} >
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}
export default SettingsScreen;
