import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../firebaseConfig';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, TextInput, StyleSheet, Text, View, ImageBackground, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { st } from '../components/Styles';
import bgimage from '../img/bg.jpg';

function EditDoc(props) {

    const [user] = useAuthState(auth);

    const [app, setApp] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [account, setAccount] = useState({});

    const doc = {
        "app": app,
        "username": username,
        "password": password
    }

    useEffect(() => {
        console.log(props.route.params);
        if (props.route.params != undefined) {
            setAccount(props.route.params);
            setApp(account.app);
            setUsername(account.username);
            setPassword(account.password);
        }
    }, [account]);

    const updateDoc = async () => {
        if (app == "" || username == "" || password == "") {
            Alert.alert('Missing data', 'Please fill all the fields');
        } else {
            const ref = doc(db, "passwordManager", user.uid);
            await updateDoc(ref, {
                accounts: arrayRemove(account)
            }).then((res) => {
                console.log('Successfully updated doc', res);
                props.navigation.navigate("All Records");
            })
                .catch((err) => {
                    console.log('Error occured while updating document.', err);
                });
        }
    }


    return (
        <ImageBackground style={st.flexContainer} source={bgimage}>
            <SafeAreaView style={st.flexContainer}>
                <View style={st.header}>
                    <Text onPress={() => props.navigation.goBack()} style={st.font}>Back</Text>
                    <Text style={st.font}>Edit Record</Text>
                    <Text onPress={updateDoc} style={st.font}>Save</Text>
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
                    <TouchableOpacity style={styles.registerButton} onPress={updateDoc}>
                        <Text style={st.font}>Update Account</Text>
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

export default EditDoc;