import React, { useEffect, useState } from 'react';
import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView, View } from 'react-native';
import { query, collection, getDocs, where, onSnapshot, doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import bgimage from '../img/bg.jpg';
import deleteIcon from '../img/delete.png';

import { db, auth } from '../../firebaseConfig';
import { update } from 'firebase/database';
import { st } from '../components/Styles';

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
        <ImageBackground style={st.flexContainer} source={bgimage}>
            <SafeAreaView style={st.flexContainer}>
                <View style={st.header}>
                    <Text onPress={() => navigation.navigate("All Records")} style={st.font}>Back</Text>
                    <Text onPress={() => navigation.navigate("AddDoc")} style={st.font}>Add</Text>
                </View>
                <View style={styles.wrapper}>
                    {accounts.map((account, i) =>
                        <View key={i} style={styles.recordWrapper}>
                            <TouchableOpacity style={styles.appDetail} onPress={() => navigation.navigate("RecordDetail", account)}>
                                <Text style={st.font}>{account.app}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRecord(account)}>
                                <Image style={st.btnIcon} source={deleteIcon} />
                            </TouchableOpacity>
                        </View>
                    )
                    }
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
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
    deleteButton: {
        backgroundColor: 'dodgerblue',
        padding: 10,
    },
    appDetail: {
        width: '60%',
        backgroundColor: 'dodgerblue',
        alignItems: 'center',
        padding: 10
    },
    recordWrapper: {
        flexDirection: 'row',
        gap: 5,
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default Records;