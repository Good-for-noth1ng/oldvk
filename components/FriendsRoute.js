import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Friends from '../screens/Friends';
import Group from '../screens/Group';
import UserList from '../screens/UserList';
import UserProfile from '../screens/UserProfile';
import OpenPost from '../screens/OpenPost';
import CommentThread from '../screens/CommentThread';
import MembersList from '../screens/MembersList';
import FollowersList from '../screens/FollowersList';

const FriendsStack = createNativeStackNavigator();

const FriendsRoute = () => {
  return (
    <FriendsStack.Navigator initialRouteName='FriendsList'>
      <FriendsStack.Screen name='FriendsList' component={Friends} options={{headerShown: false, animation: 'slide_from_right'}}/>
      <FriendsStack.Screen name='UserProfile' component={UserProfile} options={{headerShown: false, animation: 'slide_from_right'}}/>
      <FriendsStack.Screen name='OpenPost' component={OpenPost} options={{headerShown: false, animation: 'slide_from_right'}} />
      <FriendsStack.Screen name='CommentThread' component={CommentThread} options={{headerShown: false, animation: 'slide_from_right'}} />
      <FriendsStack.Screen name='Group' component={Group} options={{headerShown: false, animation: 'slide_from_right'}}/>
      <FriendsStack.Screen name='UserList' component={UserList} options={{headerShown: false, animation: 'slide_from_right'}}/>
      <FriendsStack.Screen name='MembersList' component={MembersList} options={{headerShown: false, animation: 'slide_from_right'}} />
      <FriendsStack.Screen name='FollowersList' component={FollowersList} options={{headerShown: false, animation: 'slide_from_right'}} />
    </FriendsStack.Navigator>
  )
}

export default FriendsRoute

const styles = StyleSheet.create({})