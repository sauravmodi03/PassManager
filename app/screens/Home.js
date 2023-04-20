import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, StatusBar, SafeAreaView, Button, Platform, TextInput, ImageBackground, TouchableOpacity } from 'react-native';



function Home({ navigation }) {


    const handleLogin = () => {
        console.log('Handle login');
    }

    const handleRegister = () => {
        console.log('Handle register');
    }

    return (
        <View style={styles.backgroundImage}>
            <SafeAreaView style={styles.background}>
                <View style={styles.wrapper}>
                    <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    backgroundImage: {
        flex: 1,
        backgroundColor: 'grey'
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
    background: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
        gap: 5
    },
    loginButton: {
        width: '80%',
        backgroundColor: '#569DAA',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center'
    },
    registerButton: {
        width: '80%',
        backgroundColor: "#577D86",
        borderRadius: 5,
        padding: 15,
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
    header: {
        flexDirection: "row",
        height: 50,
        width: '100%',
        alignItems: 'center',
        padding: 10
    }
});

export default Home;

