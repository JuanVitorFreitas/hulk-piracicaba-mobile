import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';


export default function Login() {
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    async function storeCredentials(credentials) {
        try {
            await AsyncStorage.setItem('credentials', JSON.stringify(credentials));
            navigation.navigate('Home', { accessToken: credentials.token });
            console.log(credentials.token);
        } catch (e) {
            console.error(`Error storing credentials: e`);
        }
    }


    async function authenticate() {
        try {
            const response = await api.post('/auth', {
                username,
                password,
            });
            storeCredentials(response.data);
            console.log('Logado com sucesso.');
        } catch (err) {
            if (err.status === '403') {
                Alert.alert('Falha no login', 'Usuário ou senha invalidos.');
            } else {
                console.error(err);
                Alert.alert('Falha no login', 'Falha ao efetuar o login. Por favor tente novamente mais tarde.');
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <Text style={styles.title}>Acesse para ver os agendamentos</Text>
                <TextInput
                    placeholder='Nome de usuário'
                    onChangeText={setUsername}
                    autoCapitalize='none'
                    autoCompleteType='username'
                    textContentType='username'
                    autoCorrect={false}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Senha'
                    onChangeText={setPassword}
                    autoCapitalize='none'
                    autoCompleteType='password'
                    textContentType='password'
                    autoCorrect={false}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => { authenticate() }}>
                    <Text style={styles.button}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}