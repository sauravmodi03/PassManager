import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView, View } from 'react-native';

function RecordDetails(props, { navigation, route }) {

    const [account, setAccount] = useState({});

    useEffect(() => {
        setAccount(props.route.params);
        console.log(props.route);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View styeles={styles.infoLabel}><Text>{account.app}</Text></View>
            <View styeles={styles.infoLabel}><Text>{account.username}</Text></View>
            <View styeles={styles.infoLabel}><Text>{account.password}</Text></View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey"
    },
    infoLabel: {
        height: 40,
        backgroundColor: "dodgerblue",
    }

})

export default RecordDetails;