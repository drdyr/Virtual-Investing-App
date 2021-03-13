import React, {useState} from 'react';
import {sha256} from "js-sha256";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from "../Styles"

const Registration = ({navigation}) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const validPassword = () => { // add regex
        return password === confPassword && password !== '';
    }


    const handleSubmit = () => {
        if (validPassword()) {

            fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    holdings: {'cash': 100000}
                }),
            }).then((response) => {
                if (response.status !== 200) {
                    invalidPasswordAlert();
                }
            })
        } else {
            invalidPasswordAlert()
            console.log('blol');
        }

        // do the things
    }
    return(
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                        value={username}
                        style={styles.textInput}
                        onChangeText={text => setUsername(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        value={email}
                        style={styles.textInput}
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        value={password}
                        style={styles.textInput}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Confirm Password</Text>
                    <TextInput
                        value={confPassword}
                        style={styles.textInput}
                        onChangeText={text => setConfPassword(text)}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity
                    styles={styles.button}
                    text={"test"}
                    onPress={handleSubmit}
                >
                    <Text>Press to Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    styles={styles.button}
                    text={"test"}
                    onPress={() => {
                        navigation.navigation.push('Login');
                    }}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>);
}



export function LoginScreen (navigation) {
    return (
        <Login navigation={navigation}/>
    )
}
export function RegistrationScreen (navigation) {
    return (
        <Registration navigation={navigation}/>
    )
}

const invalidPasswordAlert = () =>
    Alert.alert(
        "Alert",
        "Invalid Password",
        [
            {
                text: "Ok",
                onPress: () => console.log("Ask me later pressed")
            },
        ],
        { cancelable: false }
    );


