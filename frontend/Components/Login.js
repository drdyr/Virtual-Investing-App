import React, {useState} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {sha256} from "js-sha256";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import { styles } from "../Styles"

const Login = ({navigation}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    async function trySessionId(){
        let sessionID;
        try {
            const value = await AsyncStorage.getItem('@session_id')
            if(value !== null) {
                sessionID = value
            }
        } catch(e) {
            // error reading value
        }

        console.log(sessionID)

        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionID: sessionID
            }),
        }).then((response) => {
            if (response.status === 200) {
                navigation.navigate('App', {screen: 'Overview'});
            }
        })
    }

    const handleSubmit = () => {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        }).then((response) => {
            if (response.status === 200) {
                response.text().then((text) => {
                    try {
                        AsyncStorage.setItem('@session_id', text)
                    } catch (e) {
                    }
                })
                navigation.navigate('App', {screen: 'Overview'});
            }
        })
    }
    return(
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Username or Email Address</Text>
                    <TextInput
                        value={username}
                        style={styles.textInput}
                        onChangeText={text => setUsername(text)}
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
                <TouchableOpacity
                    styles={styles.button}
                    onPress={handleSubmit}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    styles={styles.button}
                    onPress={() => {
                        navigation.push('Register');
                    }}
                >
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>);


}
export default Login;
