import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Friends from '../screens/Friends';
import Group from '../screens/Group';
import ReactedUsersList from '../screens/ReactedUsersList';
import UserProfile from '../screens/UserProfile';
import OpenPost from '../screens/OpenPost';
import CommentThread from '../screens/CommentThread';
import MembersList from '../screens/MembersList';
import FollowersList from '../screens/FollowersList';
import SubscriptionsList from '../screens/SubscriptionsList';
import UsersGroups from '../screens/UsersGroups';
import VideosList from '../screens/VideosList';

const FriendsStack = createNativeStackNavigator();

const FriendsRoute = () => {
  return (
    <FriendsStack.Navigator initialRouteName='FriendsList'>
      <FriendsStack.Screen name='FriendsList' component={Friends} options={{headerShown: false, animation: 'slide_from_right'}}/>
      <FriendsStack.Screen name='UserProfile' component={UserProfile} options={{headerShown: false, animation: 'slide_from_right'}}/>
      <FriendsStack.Screen name='OpenPost' component={OpenPost} options={{headerShown: false, animation: 'slide_from_right'}} />
      <FriendsStack.Screen name='CommentThread' component={CommentThread} options={{headerShown: false, animation: 'slide_from_right'}} />
      <FriendsStack.Screen name='Group' component={Group} options={{headerShown: false, animation: 'slide_from_right'}}/>
      <FriendsStack.Screen name='ReactedUsersList' component={ReactedUsersList} options={{headerShown: false, animation: 'slide_from_right'}}/>
      <FriendsStack.Screen name='MembersList' component={MembersList} options={{headerShown: false, animation: 'slide_from_right'}} />
      <FriendsStack.Screen name='FollowersList' component={FollowersList} options={{headerShown: false, animation: 'slide_from_right'}} />
      <FriendsStack.Screen name='SubscriptionsList' component={SubscriptionsList} options={{headerShown: false, animation: 'slide_from_right'}} />
      <FriendsStack.Screen name='UsersGroups' component={UsersGroups} options={{headerShown: false, animation: 'slide_from_right'}}/>
      <FriendsStack.Screen name='VideosList' component={VideosList} options={{headerShown:false, animation: 'slide_from_right'}} />
    </FriendsStack.Navigator>
  )
}

export default FriendsRoute

const styles = StyleSheet.create({})