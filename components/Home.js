import { StyleSheet } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import News from '../screens/News';
import Messages from '../screens/Messages';
import { COLORS } from '../constants/theme';

const Drawer = createDrawerNavigator()

const Home = () => {
  return (
    <Drawer.Navigator>
        <Drawer.Screen 
          name='News' 
          component={News}
          options={styles.headerStyle}
        />
        <Drawer.Screen 
          name='Messages' 
          component={Messages}
          options={styles.headerStyle}
        />
    </Drawer.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({
  headerStyle: {
    headerStyle: {
      backgroundColor: COLORS.primary, 
    },
    headerTintColor: COLORS.white
  } 
})