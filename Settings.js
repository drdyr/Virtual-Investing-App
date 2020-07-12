import {View, TouchableOpacity, StyleSheet} from "react-native";
import React from "react";
import Text from "react-native-web/src/exports/Text";


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
            <Logout navigation={navigation}/>
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