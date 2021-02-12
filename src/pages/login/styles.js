import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 20,
        paddingHorizontal: 20,
    },
    loginContainer: {
        flex: 1,
        paddingHorizontal: 15,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    button: {
        marginVertical: 5,
        borderRadius: 8,
        height: 40,
        paddingHorizontal: 10,
        textAlignVertical: 'center',
        textAlign: 'center',
        backgroundColor: '#05c46b',
        color: '#fff'
    },
    input: {
        borderRadius: 8,
        backgroundColor: '#fff',
        height: 40,
        paddingHorizontal: 15,
        marginVertical: 5,
    },
    title: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 50,
    }
});
