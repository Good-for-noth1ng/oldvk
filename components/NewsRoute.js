import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../constants/theme';
import News from '../screens/News'; 
import OpenPost from '../screens/OpenPost';
const PostStack = createNativeStackNavigator();

const NewsRoute = () => {
  return (
      <PostStack.Navigator initialRouteName='News'>
        <PostStack.Screen  
          name='News' 
          component={News} 
          options={{headerShown: false, animationTypeForReplace:'pop'}}/>
        <PostStack.Screen 
          name='OpenPost' 
          component={OpenPost} 
          options={{headerShown:false, headerTintColor: COLORS.white, headerStyle: styles.headerStyle}}/>
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