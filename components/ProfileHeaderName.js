import { StyleSheet, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import * as Clipboard from 'expo-clipboard';
import { COLORS } from '../constants/theme'

// userurl : https://vk.com/userShortName
const ProfileHeaderName = ({userShortName}) => {
  const pattern = /id[0-9]*/g
  let name
  if (pattern.test(userShortName)) {
    name = '@' + userShortName.slice(2)
  } else {
    name = '@' + userShortName
  }
  const copyShortName = async  () => {
    await Clipboard.setStringAsync(userShortName)
    ToastAndroid.show('Copied!', ToastAndroid.show)
  }
  return (
    <TouchableOpacity onPress={copyShortName} >
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  )
}

export default ProfileHeaderName

const styles = StyleSheet.create({
  name: {
    color: COLORS.white, 
    fontSize: 18, 
    fontWeight: 'bold',
  }
})