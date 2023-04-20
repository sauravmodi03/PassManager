import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, StatusBar, SafeAreaView, Button, Platform, TextInput, ImageBackground, TouchableOpacity  } from 'react-native';



function Home({navigation}) {


    const handleLogin = () => {
        console.log('Handle login');
    }

    const handleRegister = () => {
        console.log('Handle register');
    }

    return (
            <ImageBackground style={styles.backgroundImage} source={require('../img/bg.jpeg')}>
                <SafeAreaView style={styles.background}>
                    <TouchableOpacity style={styles.registerButton} onPress={()=> navigation.navigate("Register")}>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={()=> navigation.navigate("Login")}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage:{
        flex:1,
    },
    buttonText:{
        color:'white'
    },
    background :{
        flex:1,
        paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
        alignItems:'center',
        justifyContent:'flex-end',
        gap:5
    },
    loginButton:{
        width:'80%',
        backgroundColor: '#569DAA',
        borderRadius:5,
        padding:10,
        alignItems:'center'
    },
    registerButton:{
        width:'80%',
        backgroundColor:"#577D86",
        borderRadius:5,
        padding:10,
        alignItems:'center'
    },
    input: {
        width:'80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'lightgrey'
    }
});

export default Home;

