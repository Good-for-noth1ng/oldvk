import { StyleSheet, Image } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MessagesRoute from './MessagesRoute';
import Audio from '../screens/Audio';
import Answers from '../screens/Answers';
import Favorites from '../screens/Favorites';
import OptionsRoute from './OptionsRoute';
import CustomDrawer from './CustomDrawer';
import NewsRoute from './NewsRoute';
import GropsRoute from './GropsRoute';
import FriendsRoute from './FriendsRoute';
import UserPageRoute from './UserPageRoute';
import PhotosRoute from './PhotosRoute';
import VideosRoute from './VideosRoute';
import FavoriteRoute from './FavoriteRoute';
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
        <Drawer.Screen name={'CurrentUser'} component={UserPageRoute} options={{
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
          headerShown: false,
          drawer: 'Friends'
        }}/>
        <Drawer.Screen name='PhotosRoute' component={PhotosRoute} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='camera' size={20} color={color}/>
          ),
          headerShown: false,
          drawerLabel: 'Photos',
        }}/>
        <Drawer.Screen name='VideosRoute' component={VideosRoute} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='film' size={20} color={color}/>
          ),
          headerShown: false,
          drawerLabel: 'Videos'
        }}/>
        {/* <Drawer.Screen name='Audio' component={Audio} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='music' size={20} color={color}/>
          )
        }}/> */}
        <Drawer.Screen name='MessagesRoute' component={MessagesRoute} options={{
          drawerIcon: ({color}) => (
            <FontAwesome name='envelope' size={20} color={color}/>
          ),
          headerShown: false,
          drawerLabel: 'Messages'
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
        }}/> */}
        <Drawer.Screen name='FavoriteRoute' component={FavoriteRoute} options={{
          drawerIcon: ({color}) => (
            <Entypo name='star' size={20} color={color}/>
          ),
          headerShown: false,
          drawerLabel: 'Favorite'
        }}/>
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