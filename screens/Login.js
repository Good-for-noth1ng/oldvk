import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'

const Login = () => {
  return (
    <View>
      <SafeAreaView>
        <StatusBar />
        <View style={{backgroundColor: 'rgba(81, 129, 184, 1)'}}></View>
      </SafeAreaView>
    </View>
  )
}

export default Login