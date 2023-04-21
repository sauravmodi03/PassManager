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
                <View style={styles.info}>
                    <Text style={styles.paramLabel}>Username:</Text>
                    <Text>{account.username}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={[styles.paramLabel, styles.appFont]}>Password:</Text>
                    <Text>{account.password}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey"
    },
    info: {
        width: '70%',
        backgroundColor: "dodgerblue",
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        gap: 10
    },
    header: {
        flexDirection: "row",
        height: 50,
        width: '100%',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between'
    },
    backButton: {
        fontSize: 25
    },
    appLabel: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
    },
    appFont: {
        fontSize: 25,
        color: 'white'
    }

})

export default RecordDetails;