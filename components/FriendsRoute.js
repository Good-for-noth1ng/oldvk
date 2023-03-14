import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Friends from '../screens/Friends';
import UserProfile from '../screens/UserProfile';

const FriendsStack = createNativeStackNavigator();

const FriendsRoute = () => {
  return (
    <FriendsStack.Navigator initialRouteName='FriendsList'>
      <FriendsStack.Screen name='FriendsList' component={Friends} options={{headerShown: false}}/>
      <FriendsStack.Screen name='UserProfile' component={UserProfile} options={{headerShown: false}}/>
    </FriendsStack.Navigator>
  )
}

export default FriendsRoute

const styles = StyleSheet.create({})