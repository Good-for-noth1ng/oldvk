import React from 'react'
import { Text, View, TouchableOpacity, useWindowDimensions, Dimensions } from 'react-native'
import { SIZES, COLORS } from '../constants/theme'
export const LoginButton = ({buttonText, navigation }) => {  
  return (
    <TouchableOpacity style={{
      width: 170,
      height: 45,
      backgroundColor: COLORS.primary,
      borderRadius: 5,
      padding: 5,
      alignContent: 'center'
    }} onPress={() => navigation.navigate('WebViewLogin')}>
      <Text style={{
        fontFamily: 'sans-serif',
        fontSize: SIZES.small + 2,
        color: COLORS.white,
        textAlign: 'center'
      }}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  )
}
