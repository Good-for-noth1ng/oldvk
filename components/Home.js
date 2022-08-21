import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import News from '../screens/News';

const Drawer = createDrawerNavigator()

const Home = () => {
  return (
    <Drawer.Navigator>
        <Drawer.Screen name='News' component={News}/>
    </Drawer.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({})