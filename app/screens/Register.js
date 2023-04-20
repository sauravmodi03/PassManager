import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Text, Button, View, StatusBar } from 'react-native';
import {ref,  set, onValue,    push,    update,    remove  } from 'firebase/database';
import {auth, db} from '../../firebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { QuerySnapshot, collection, onSnapshot, query, addDoc, where, getDocs, setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';

// import {db} from '../firebase/firebaseConfig';

function Register({navigation, back}) {

    const [userAuth] = useAuthState(auth);
    console.log(userAuth);

    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    const user = {
        "uid":"uid",
        "fname":fname,
        "lname":lname,
        "email":email,
        accounts:[]
    }

    const handleRegister = async(e) => {
        createUserWithEmailAndPassword(auth, email, password).then((res) => {
            console.log(res);
            addUser(res);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const addUser = async(res) => {
        user.uid = res.user.uid;
        const dbRef = collection(db, "passwordManager");
        console.log(user);
        await addDoc(dbRef, user).then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    // , where("uid", "===", "ANvoU2kvXrVRRRqTR1P2hl62MZH3")

    useEffect(() =>{
        async function getData(){
            const q = query(collection(db, "passwordManager"), where("uid", "==", "ANvoU2kvXrVRRRqTR1P2hl62MZH3"));
            const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data().accounts);
            });
        }
        

        const newApp = {
            "app" : "facebook",
            "username": "test2",
            "password": "test3"
        }
        
        async function setData(){
            const ref = doc(db, "passwordManager","ANvoU2kvXrVRRRqTR1P2hl62MZH3");
            await updateDoc(ref, {
                accounts: arrayUnion(newApp)
            });
        }

    },[])

    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.header}>
                <Button style={styles.cancelButton} title='Back' onPress={()=> navigation.goBack()}/>
            </View> */}
            <TextInput
                style={styles.input}
                value={email}
                placeholder='Email'
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                value={fname}
                placeholder='First Name'
                onChangeText={setFname}
            />
            <TextInput
                style={styles.input}
                value={lname}
                placeholder='Last Name'
                onChangeText={setLName}
            />
            <TextInput
                style={styles.input}
                value={password}
                placeholder="Password"
                onChangeText={setPassword}
                secureTextEntry={true}
            />
             <TextInput
                style={styles.input}
                value={passwordConf}
                placeholder="Confirm Password"
                onChangeText={setPasswordConf}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <Button style={styles.cancelButton} color='white' title='Cancel' onPress={()=> navigation.goBack()}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'grey'
    },
    input: {
        width:'80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'lightgrey'
    },
    registerButton:{
        width:'80%',
        backgroundColor:"#577D86",
        borderRadius:5,
        padding:10,
        alignItems:'center'
    },
    header:{
        height:40,
        width:'100%',
        position:'absolute',
        backgroundColor:'red',
        top: StatusBar.currentHeight
        
    },
    cancelButton:{
        backgroundColor:'red'
    }
});

export default Register;