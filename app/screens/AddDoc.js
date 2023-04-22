import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../firebaseConfig';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, TextInput, StyleSheet, Text, View, ImageBackground, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { st } from '../components/Styles';
import bgimage from '../img/bg.jpg';

function AddDoc(props) {

    const [user] = useAuthState(auth);

    const [app, setApp] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const newApp = {
        "app": app,
        "username": username,
        "password": password
    }

    const addNewDoc = async () => {
        if (app == "" || username == "" || password == "") {
            Alert.alert('Missing data', 'Please fill all the fields');
        } else {
            const ref = doc(db, "passwordManager", user.uid);
            await updateDoc(ref, {
                accounts: arrayUnion(newApp)
            }).then((res) => {
                console.log('Successfully added new doc', res);
                props.navigation.navigate("All Records");
            })
                .catch((err) => {
                    console.log('Error occured', err);
                });
        }

    }

    const validate = () => {

    }

    return (
        <ImageBackground style={st.flexContainer} source={bgimage}>
            <SafeAreaView style={st.flexContainer}>
                <View style={st.header}>
                    <Text onPress={() => props.navigation.navigate("All Records")} style={st.font}>Back</Text>
                    <Text style={st.font}>New Record</Text>
                    <Text onPress={addNewDoc} style={st.font}>Save</Text>
                </View>
                <View style={styles.wrapper}>
                    <TextInput
                        style={styles.input}
                        value={app}
                        placeholder='App name'
                        onChangeText={setApp}
                    />
                    <TextInput
                        style={styles.input}
                        value={username}
                        placeholder='Username'
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        value={password}
                        placeholder="Password"
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.registerButton} onPress={addNewDoc}>
                        <Text style={st.font}>Add Account</Text>
                    </TouchableOpacity>
                    <Button style={styles.cancelButton} color='white' title='Cancel' onPress={() => props.navigation.goBack()} />
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey'
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
        padding: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },
    headerFont: {
        fontSize: 25,
        color: 'white'
    }
})

export default AddDoc;