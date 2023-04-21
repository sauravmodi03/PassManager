import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView, View } from 'react-native';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import { db, auth } from '../../firebaseConfig';

function Records({ navigation, back }) {

    const [accounts, setAccounts] = useState([]);
    const [user] = useAuthState(auth);
    console.log("User is printed " + user.uid);

    async function getData() {
        const q = query(collection(db, "passwordManager"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setAccounts(doc.data().accounts);
            console.log(accounts);
        });
    }

    useEffect(() => {
        getData();
    }, []);

    const showDetails = (acc) => {
        // navigation.navigate("RecordDetail", acc);
        console.log(acc);
    }

    return (
        <SafeAreaView style={styles.constainer}>
            {accounts.map((account, i) =>
                <TouchableOpacity key={i} style={styles.accContainer} onPress={() => navigation.navigate("RecordDetail", account)}>
                    <Text>{account.app}</Text>
                </TouchableOpacity>
            )
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        gap: 5,
        paddingTop: 100,
        backfaceVisibility: 'hidden'
    },
    accContainer: {
        backgroundColor: "dodgerblue",
        height: 40,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
});

export default Records;