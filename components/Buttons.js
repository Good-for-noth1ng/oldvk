import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'
import { SIZES, COLORS } from '../constants/theme'
import { APP_ID, PERMISION_CODE, REDIRECT_URI } from '@env'
export const LoginButton = ({buttonText, handlePress}) => {
  const [openLogin, setOpenLogin] = useState(false)
  
  const onNavChange = (navigationState) => {
    console.log(navigationState.url)
  }
  
  return (
    openLogin ? 
    <View style={{flex: 1}}>
      <WebView 
        source={{uri: `https://oauth.vk.com/authorize?client_id=${APP_ID}&display=mobile&redirect_uri=${REDIRECT_URI}&scope=${PERMISION_CODE}&response_type=token&v=5.131&revoke=1`}}
        onNavigationStateChange={onNavChange}
        style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width}}
      /> 
    </View> :
    (
    <TouchableOpacity style={{
      width: 170,
      height: 45,
      backgroundColor: COLORS.primary,
      borderRadius: 5,
      padding: 5,
      alignContent: 'center'
    }} onPress={() => setOpenLogin(true)}>
      <Text style={{
        fontFamily: 'sans-serif',
        fontSize: SIZES.small + 2,
        color: COLORS.white,
        textAlign: 'center'
      }}>
        {buttonText}
      </Text>
    </TouchableOpacity>)
  )
}
