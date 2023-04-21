import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView, View } from 'react-native';
import { query, collection, getDocs, where, onSnapshot, doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import { db, auth } from '../../firebaseConfig';
import { update } from 'firebase/database';

function Records({ navigation, back, route }) {

    const [accounts, setAccounts] = useState([]);
    const [user] = useAuthState(auth);
    console.log("User is printed " + user.uid);

    async function getData() {
        const q = query(collection(db, "passwordManager"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setAccounts(doc.data().accounts);
        });
    }



    useEffect(() => {
        console.log("triggered");
        getData();

        const unsubscribe = onSnapshot(doc(db, "passwordManager", user.uid), (doc) => {
            getData();
        });
    }, [navigation]);

    const showDetails = (acc) => {
        // navigation.navigate("RecordDetail", acc);
        console.log(acc);
    }

    const deleteRecord = async (account) => {
        const ref = doc(db, 'passwordManager', user.uid);
        await updateDoc(ref, {
            accounts: arrayRemove(account)
        }).then((res) => {
            console.log(res);
            Alert.alert('Response', 'Record Deleted succfully');
        }).catch((err) => {
            console.log(err);
        });

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text onPress={() => navigation.navigate("All Records")} style={styles.headerFont}>Back</Text>
                <Text onPress={() => navigation.navigate("AddDoc")} style={styles.headerFont}>Add</Text>
            </View>
            <View style={styles.wrapper}>
                {accounts.map((account, i) =>
                    <View key={i} style={styles.recordWrapper}>
                        <TouchableOpacity style={styles.appDetail} onPress={() => navigation.navigate("RecordDetail", account)}>
                            <Text>{account.app}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRecord(account)}><Text>Delete</Text></TouchableOpacity>
                    </View>
                )
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
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
        gap: 5,
        paddingTop: 20
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
    },
    deleteButton: {
        color: 'white',
        backgroundColor: 'dodgerblue',
        padding: 10,
        borderRadius: 5
    },
    appDetail: {
        width: '60%',
        height: 40,
        backgroundColor: 'dodgerblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    recordWrapper: {
        flexDirection: 'row',
        gap: 5
    }
});

export default Records;