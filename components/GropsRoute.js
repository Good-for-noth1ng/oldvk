import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GroupList from '../screens/GroupList';
import OpenPost from '../screens/OpenPost';
import Group from '../screens/Group';
import CommentThread from '../screens/CommentThread';
import UserProfile from '../screens/UserProfile';

const GroupStack = createNativeStackNavigator();

const GropsRoute = () => {
  return (
    <GroupStack.Navigator initialRouteName='GroupList'>
      <GroupStack.Screen name='GroupList' component={GroupList} options={{headerShown: false}}/>
      <GroupStack.Screen name='Group' component={Group} options={{headerShown: false}}/>
      <GroupStack.Screen name='OpenPost' component={OpenPost} options={{headerShown: false}}/>
      <GroupStack.Screen name='CommentThread' component={CommentThread} options={{headerShown: false}}/>
      <GroupStack.Screen name='UserProfile' component={UserProfile} options={{headerShown: false}}/>
    </GroupStack.Navigator>
  )
}

export default GropsRoute

const styles = StyleSheet.create({})