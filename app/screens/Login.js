import React, { useState } from 'react';
import { Button } from 'react-native';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebaseConfig';

function Login({ navigation, back }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (username != "" && password != "") {
            signInWithEmailAndPassword(auth, username, password).then((ref) => {
                console.log(ref);
                setError("");
                navigation.navigate("All Records");
            })
                .catch((ref) => {
                    console.log(ref);
                    setError('No user found with the email..!!')
                });
        } else {
            setError('Please fill both the field..!!')
        }
    }

    const goBack = () => {
        navigation.navigate("Home");
    }

    // const googleSingin = () => {
    //     const provider = new GoogleAuthProvider();
    //     signInWithRedirect(auth, provider);
    // }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header} ><Text onPress={goBack} style={styles.backButton}>Back</Text></View>
            <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    value={username}
                    placeholder='Username'
                    onChangeText={setUsername} />
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="Password"
                    onChangeText={setPassword}
                    secureTextEntry={true} />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                {/* <View><GoogleButton onClick={googleSingin} /></View> */}
                <Button style={styles.cancelButton} color='white' title='Cancel' onPress={() => navigation.goBack()} />
                <Text>{error}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
    },
    loginButton: {
        width: '80%',
        height: 40,
        backgroundColor: '#569DAA',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center'
    },
    input: {
        width: '80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'lightgrey'
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    header: {
        flexDirection: "row",
        height: 50,
        width: '100%',
        alignItems: 'center',
        padding: 10
    },
    backButton: {
        fontSize: 25
    }
});

export default Login;