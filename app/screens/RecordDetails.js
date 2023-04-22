import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { st } from '../components/Styles';
import bgimage from '../img/bg.jpg';

function RecordDetails(props) {

    const [account, setAccount] = useState({});

    useEffect(() => {
        setAccount(props.route.params);
        console.log(props.route);
    }, []);

    return (
        <ImageBackground style={st.flexContainer} source={bgimage}>
            <SafeAreaView style={st.flexContainer}>
                <View style={[st.header]}>
                    <Text onPress={() => props.navigation.navigate("All Records")} style={st.font}>Back</Text>
                    <Text style={st.font}>Record</Text>
                    <Text style={st.font}>Edit</Text>
                </View>
                <View style={styles.wrapper}>
                    <View><Text style={[st.font, styles.info]}>Title: {account.app}</Text></View>
                    <View style={styles.info}>
                        <Text style={st.font}>Username:</Text>
                        <Text style={st.font}>{account.username}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={[st.font]}>Password:</Text>
                        <Text style={[st.font]}>{account.password}</Text>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 20,
        width: '80%',
        backgroundColor: '#344D67',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 10,
        gap: 30
    },
    info: {
        borderBottomColor: '#393E46',
        borderBottomWidth: 1
    }
})

export default RecordDetails;