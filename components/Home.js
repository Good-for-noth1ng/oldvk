import { StyleSheet } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
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
    <Drawer.Navigator 
      initialRouteName='News' 
      drawerContent={props => <CustomDrawer {...props}/>}
      screenOptions={{
          drawerLabelStyle: {
            marginLeft: -10,
        },
        headerStyle: {
          backgroundColor: COLORS.primary
        },
        headerTintColor: COLORS.white
      }}
      
    >
        <Drawer.Screen name='Friends' component={Friends} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='user' color={color} size={20}/>
          ),
        }}/>
        <Drawer.Screen name='Photos' component={Photos} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='camera' size={20} color={color}/>
          )
        }}/>
        <Drawer.Screen name='Videos' component={Videos} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='film' size={20} color={color}/>
          )
        }}/>
        <Drawer.Screen name='Audio' component={Audio} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='music' size={20} color={color}/>
          )
        }}/>
        <Drawer.Screen name='Messages' component={Messages} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='envelope' size={20} color={color}/>
          )
        }}/>
        <Drawer.Screen name='Groups' component={Groups} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='users' size={20} color={color}/>
          )
        }}/>
        <Drawer.Screen name='News' component={News} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='list-alt' size={20} color={color}/>
          ),
          // headerBackground: ({navigation, route, options}) => {
          //   const title = getHeaderTitle(options, route.name)
          //   return 
          // }
        }}/>
        <Drawer.Screen name='Answers' component={Answers} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='comments' size={20} color={color}/>
          )
        }}/>
        <Drawer.Screen name='Favorites' component={Favorites} options={{
          drawerIcon: ({color}) => (
            <Entypo name='star' size={20} color={color}/>
          )
        }}/>
        <Drawer.Screen name='Options' component={Options} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='gear' size={20} color={color}/>
          )
        }}/>
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