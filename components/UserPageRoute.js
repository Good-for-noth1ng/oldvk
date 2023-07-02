import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OpenPost from '../screens/OpenPost';
import Group from '../screens/Group';
import CommentThread from '../screens/CommentThread';
import UserProfile from '../screens/UserProfile';
import ReactedUsersList from '../screens/ReactedUsersList';
import MembersList from '../screens/MembersList';
import FollowersList from '../screens/FollowersList';
import SubscriptionsList from '../screens/SubscriptionsList';
import UsersGroups from '../screens/UsersGroups';
import VideosList from '../screens/VideosList';

const UserPageStack = createNativeStackNavigator();

const UserPageRoute = () => {
  return (
    <UserPageStack.Navigator initialRouteName='UserProfile'>
      <UserPageStack.Screen name='UserProfile' component={UserProfile} options={{headerShown:false, animation: 'slide_from_right'}} />
      <UserPageStack.Screen name='OpenPost' component={OpenPost} options={{headerShown:false, animation: 'slide_from_right'}} />
      <UserPageStack.Screen name='Group' component={Group} options={{headerShown:false, animation: 'slide_from_right'}} />
      <UserPageStack.Screen name='CommentThread' component={CommentThread} options={{headerShown:false, animation: 'slide_from_right'}} />
      <UserPageStack.Screen name='ReactedUsersList' component={ReactedUsersList} options={{headerShown:false, animation: 'slide_from_right'}} />
      <UserPageStack.Screen name='MembersList' component={MembersList} options={{headerShown:false, animation: 'slide_from_right'}} />
      <UserPageStack.Screen name='FollowersList' component={FollowersList} options={{headerShown:false, animation: 'slide_from_right'}} />
      <UserPageStack.Screen name='SubscriptionsList' component={SubscriptionsList} options={{headerShown:false, animation: 'slide_from_right'}} />
      <UserPageStack.Screen name='UsersGroups' component={UsersGroups} options={{headerShown:false, animation: 'slide_from_right'}} />
      <UserPageStack.Screen name='VideosList' component={VideosList} options={{headerShown:false, animation: 'slide_from_right'}} />
    </UserPageStack.Navigator>
  )
}

export default UserPageRoute

const styles = StyleSheet.create({})