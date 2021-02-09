import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    text: {
        color: 'white',
        textAlign: 'center',
        marginTop: Constants.statusBarHeight,
        fontSize: 25,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    header: {
        backgroundColor: '#57606f',
        paddingBottom: 15,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
});



