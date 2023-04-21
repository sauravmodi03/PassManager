import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView, View } from 'react-native';
import { query, collection, getDocs, where, onSnapshot, doc } from 'firebase/firestore';
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
        console.log("triggered");
        getData();

        // const unsubscribe = onSnapshot(doc(db, "passwordManager", user.uid), (doc) => {
        //     // if (doc.data().accounts != accounts) {
        //     //setAccounts(doc.data().accounts);
        //     // }
        //     //setAccounts(doc.data().accounts);
        // });
        // unsubscribe();
    }, []);

    const showDetails = (acc) => {
        // navigation.navigate("RecordDetail", acc);
        console.log(acc);
    }

    return (
        <SafeAreaView style={styles.constainer}>
            <View style={styles.header}>
                <Text onPress={() => navigation.navigate("All Records")} style={styles.headerFont}>Back</Text>
                <Text onPress={() => navigation.navigate("AddDoc")} style={styles.headerFont}>Add</Text>
            </View>
            <View style={styles.wrapper}>
                {accounts.map((account, i) =>
                    <TouchableOpacity key={i} style={styles.accContainer} onPress={() => navigation.navigate("RecordDetail", account)}>
                        <Text>{account.app}</Text>
                    </TouchableOpacity>
                )
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        backgroundColor: 'grey',
        gap: 5,
        paddingTop: 100
    },
    accContainer: {
        backgroundColor: "dodgerblue",
        height: 40,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
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

});

export default Records;