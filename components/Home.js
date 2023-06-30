import { StyleSheet, Image } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { getHeaderTitle } from '@react-navigation/elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Messages from '../screens/Messages';
import Friends from '../screens/Friends';
import Photos from '../screens/Photos';
import Videos from '../screens/Videos';
import Audio from '../screens/Audio';
import GroupList from '../screens/GroupList';
import Answers from '../screens/Answers';
import Favorites from '../screens/Favorites';
import Options from '../screens/Options';
import OptionsRoute from './OptionsRoute';
import CustomDrawer from './CustomDrawer';
import NewsRoute from './NewsRoute';
import GropsRoute from './GropsRoute';
import FriendsRoute from './FriendsRoute';
import UserProfile from '../screens/UserProfile';
import { COLORS } from '../constants/theme';

const Drawer = createDrawerNavigator()
const Home = () => {
  const userData = useSelector(state => state.user)
  const urlDrawerPhoto = userData.userProfileDrawerPhotoUrl
  const userName = `${userData.firstName} ${userData.lastName}`
  return (
    <Drawer.Navigator 
      id='MainDrawer'
      initialRouteName='Newsfeed' 
      drawerContent={props => <CustomDrawer {...props}/>}
      screenOptions={{
          drawerLabelStyle: {
            marginLeft: -10,
          },
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          drawerInactiveTintColor: COLORS.white,
          drawerActiveTintColor: COLORS.white,
          drawerType: 'slide'
      }}
    >
        <Drawer.Screen name={'CurrentUser'} component={UserProfile} options={{
          drawerIcon: () => (
            <Image source={{uri: urlDrawerPhoto}} style={{width: 80, height: 80, borderRadius: 5}}/>
          ),
          headerShown: false,
          drawerItemStyle: {
            display: 'none'
          }
        }}/>

        <Drawer.Screen name='Friends' component={FriendsRoute} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='user' color={color} size={20}/>
          ),
          headerShown: false
        }}/>
        {/* <Drawer.Screen name='Photos' component={Photos} options={{
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
        }}/> */}
        <Drawer.Screen name='Messages' component={Messages} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='envelope' size={20} color={color}/>
          )
        }}/>
        <Drawer.Screen name='Communities' component={GropsRoute} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='users' size={20} color={color}/>
          ),
          headerShown: false
        }}/>
        <Drawer.Screen name='Newsfeed' component={NewsRoute} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='list-alt' size={20} color={color}/>
          ),
          // headerTitle: (props) => <NewsTitleSwitcher {...props} />,
          headerShown: false
          // headerBackground: ({navigation, route, options}) => {
          //   const title = getHeaderTitle(options, route.name)
          //   return 
          // }
        }}/>
        {/* <Drawer.Screen name='Answers' component={Answers} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='comments' size={20} color={color}/>
          )
        }}/>
        <Drawer.Screen name='Favorites' component={Favorites} options={{
          drawerIcon: ({color}) => (
            <Entypo name='star' size={20} color={color}/>
          )
        }}/> */}
        <Drawer.Screen name='Options' component={OptionsRoute} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='gear' size={20} color={color}/>
          ),
          headerShown: false,
          
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