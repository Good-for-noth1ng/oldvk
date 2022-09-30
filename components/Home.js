import { StyleSheet } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import News from '../screens/News';
import Messages from '../screens/Messages';
import Friends from '../screens/Friends';
import Photos from '../screens/Photos';
import Videos from '../screens/Videos';
import Audio from '../screens/Audio';
import Groups from '../screens/Groups';
import Answers from '../screens/Answers';
import Favorites from '../screens/Favorites';
import Options from '../screens/Options';
import CustomDrawer from './CustomDrawer';
import { COLORS } from '../constants/theme';

const Drawer = createDrawerNavigator()

const Home = () => {
  return (
    <Drawer.Navigator initialRouteName='News' drawerContent={props => <CustomDrawer {...props}/>}>
        <Drawer.Screen name='Friends' component={Friends} options={styles.headerStyle}/>
        <Drawer.Screen name='Photos' component={Photos} options={styles.headerStyle}/>
        <Drawer.Screen name='Videos' component={Videos} options={styles.headerStyle}/>
        <Drawer.Screen name='Audio' component={Audio} options={styles.headerStyle}/>
        <Drawer.Screen name='Messages' component={Messages} options={styles.headerStyle}/>
        <Drawer.Screen name='Groups' component={Groups} options={styles.headerStyle}/>
        <Drawer.Screen name='News' component={News} options={styles.headerStyle}/>
        <Drawer.Screen name='Answers' component={Answers} options={styles.headerStyle}/>
        <Drawer.Screen name='Favorites' component={Favorites} options={styles.headerStyle}/>
        <Drawer.Screen name='Options' component={Options} options={styles.headerStyle}/>
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