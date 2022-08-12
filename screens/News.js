import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

const News = () => {
  const message = useSelector(state => state.user.isLoggedIn)
  return (
    <View>
      <SafeAreaView>
        <StatusBar animated={true}/>
        <Text>news</Text>
      </SafeAreaView>
    </View>
  )
}

export default News