import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Login from '../screens/Login';
import Home from './Home';
import WebViewLogin from '../screens/WebViewLogin';

const Stack = createNativeStackNavigator();

const AppContainer = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)  
    return (
        <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                {
                    isLoggedIn ? 
                    <Stack.Screen name='Home' component={ Home }/> : 
                    <>
                        <Stack.Screen name='Login' component={ Login }/>
                        <Stack.Screen name='WebViewLogin' component={ WebViewLogin } />
                    </>                        
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppContainer