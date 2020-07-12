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

class Logout extends React.Component {

    render() {
        return (

                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigation.navigate('Login', {screen: 'Overview'})
                }} >
                    <Text>Logout</Text>
                </TouchableOpacity>

        )

    }
}

export function SettingsScreen(navigation) { //Settings tab
    return (
        <View>
            <Logout navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        alignSelf: "stretch",
        height: 100,
        justifyContent: "center",
        backgroundColor: '#004d43',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#018c7a",
    },
})