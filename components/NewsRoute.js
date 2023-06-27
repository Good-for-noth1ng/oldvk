import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../constants/theme';
import News from '../screens/News'; 
import OpenPost from '../screens/OpenPost';
import Group from '../screens/Group';
import CommentThread from '../screens/CommentThread';
import UserProfile from '../screens/UserProfile';
import ReactedUsersList from '../screens/ReactedUsersList';
import MembersList from '../screens/MembersList';
import FollowersList from '../screens/FollowersList';

const PostStack = createNativeStackNavigator();

const NewsRoute = () => {
  return (
    <PostStack.Navigator initialRouteName='News'>
      <PostStack.Screen name='News' component={News} options={{headerShown: false, animation: 'slide_from_right'}} />
      <PostStack.Screen name='OpenPost' component={OpenPost} options={{headerShown:false, animation: 'slide_from_right'}} />
      <PostStack.Screen name='Group' component={Group} options={{headerShown: false, animation: 'slide_from_right'}} />
      <PostStack.Screen name='CommentThread' component={CommentThread} options={{headerShown: false, animation: 'slide_from_right'}} />
      <PostStack.Screen name='UserProfile' component={UserProfile} options={{headerShown: false, animation: 'slide_from_right'}} />
      <PostStack.Screen name='ReactedUsersList' component={ReactedUsersList} options={{headerShown: false, animation: 'slide_from_right'}} />
      <PostStack.Screen name='MembersList' component={MembersList} options={{headerShown: false, animation: 'slide_from_right'}} />
      <PostStack.Screen name='FollowersList' component={FollowersList} options={{headerShown: false, animation: 'slide_from_right'}} />
    </PostStack.Navigator>
  )
}

export default NewsRoute

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: COLORS.primary,
    color: COLORS.white
  }
})