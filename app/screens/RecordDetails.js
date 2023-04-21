import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import { SafeAreaView, View } from 'react-native';

function RecordDetails(props) {

    const [account, setAccount] = useState({});

    useEffect(() => {
        setAccount(props.route.params);
        console.log(props.route);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text onPress={() => props.navigation.navigate("All Records")} style={styles.backButton}>Back</Text>
            </View>
            <View style={styles.wrapper}>
                <View styeles={styles.infoLabel}><Text>{account.app}</Text></View>
                <View styeles={styles.infoLabel}><Text>{account.username}</Text></View>
                <View styeles={styles.infoLabel}><Text>{account.password}</Text></View>
            </View>
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
        padding: 10
    },
    backButton: {
        fontSize: 25
    }

})

export default RecordDetails;