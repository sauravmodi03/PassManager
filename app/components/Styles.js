import { StyleSheet } from "react-native";


export const st = StyleSheet.create({
    flexContainer: { flex: 1 },
    imgContainer: {
        flex: 1
    },
    font: {
        fontSize: 25,
        color: 'white'
    },
    whiteFont: { color: 'white' },
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
    btnIcon: {
        width: 25,
        height: 25
    }
});
