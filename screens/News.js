import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

const News = () => {
  const message = useSelector(state => state.user.isLoggedIn)
  return (
    <View>
      <Text>news</Text>
    </View>
  )
}

export default News