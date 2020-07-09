import React from 'react';
import {sha256} from "js-sha256";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

class Registration extends React.Component {

    constructor(props){
        super(props);
        this.state ={ username: "", email: "", password: "", cpass: ""}
    }

    validPassword = () => { // add more criteria, e.g. min char length, symbol requirement, etc
        return this.state.password === this.state.cpass && this.state.password !== '';
    }


    handleSubmit = () => {
        if (this.validPassword()) {

            fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    email: this.state.email,
                    password: sha256(this.state.password)
                }),
            }); /*.then((response)=>response.text())
                .then((text)=>{
                    if (text === "login successful") {

                    }
                }) */
        } else {
            invalidPasswordAlert()
            console.log('blol');


        }


        // do the things
    }
    render() {
        return(
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                        value={this.state.username}
                        style={styles.textInput}
                        onChangeText={text => this.setState({username: text})}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        value={this.state.email}
                        style={styles.textInput}
                        onChangeText={text => this.setState({email: text})}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        value={this.state.password}
                        style={styles.textInput}
                        onChangeText={text => this.setState({password: text})}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Confirm Password</Text>
                    <TextInput
                        value={this.state.cpass}
                        style={styles.textInput}
                        onChangeText={text => this.setState({cpass: text})}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity
                    styles={styles.button}
                    text={"test"}
                    onPress={this.handleSubmit}
                >
                    <Text>Press to Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    styles={styles.button}
                    text={"test"}
                    onPress={() => {
                        this.props.navigation.navigation.push('Login');
                    }}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>);
    }
}


class Login extends React.Component {

    constructor(props){
        super(props);
        this.state ={ username: "", password: ""}
    }

    handleSubmit = () => {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: sha256(this.state.password)
            }),
        }).then((response) => response.text())
            .then((text) => {
                if (text === "login successful") {
                    this.props.navigation.navigation.navigate('App', {screen: 'Overview'});
                }
        })
    }
    render() {
        return(
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Username or Email Address</Text>
                    <TextInput
                        value={this.state.username}
                        style={styles.textInput}
                        onChangeText={text => this.setState({username: text})}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        value={this.state.password}
                        style={styles.textInput}
                        onChangeText={text => this.setState({password: text})}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity
                    styles={styles.button}
                    onPress={this.handleSubmit}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    styles={styles.button}
                    onPress={() => {
                        this.props.navigation.navigation.push('Register');
                    }}


                >
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>);
    }


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

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        marginHorizontal: 'auto',
        width: '50%',
    },

    inputContainer: {
        margin: 5,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    textInput:{
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
    },
    button:{
        alignSelf: "stretch",
        height: 100,
        justifyContent: "center",
        backgroundColor: '#004d43',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#018c7a",
    },

});


