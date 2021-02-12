import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/home';
import Login from './src/pages/login';


export default function App() {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false,  } } >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name='Login' component={Login}/>
            </Stack.Navigator>
            
        </NavigationContainer>
  );
}
