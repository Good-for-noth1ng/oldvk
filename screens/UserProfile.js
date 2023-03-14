import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { COLORS } from '../constants/theme'

const UserProfile = () => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  
  return (
    <SafeAreaView>
      <Text>UserProfile</Text>
    </SafeAreaView>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  mainContainerLight: {
    flex: 1,
    backgroundColor: COLORS.light_smoke
  },
  mainContainerDark: {
    flex: 1,
    backgroundColor: COLORS.background_dark
  },
})