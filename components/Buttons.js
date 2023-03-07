
import React from 'react'
import { Text, View, TouchableOpacity, useWindowDimensions, Dimensions, StyleSheet } from 'react-native'
import { SIZES, COLORS } from '../constants/theme'

export const LoginButton = ({buttonText, navigation, isLightTheme }) => {  
  return (
    <TouchableOpacity style={isLightTheme ? styles.buttonContainerLight : styles.buttonContainerDark} onPress={() => navigation.navigate('WebViewLogin')}>
      <Text style={isLightTheme ? styles.textLight : styles.textDark}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainerLight: {
    width: 170,
    height: 45,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    padding: 5,
    alignContent: 'center'
  },
  buttonContainerDark: {
    width: 170,
    height: 45,
    backgroundColor: COLORS.primary_dark,
    borderRadius: 5,
    padding: 5,
    alignContent: 'center'
  },
  textLight: {
    fontFamily: 'sans-serif',
    fontSize: SIZES.small + 2,
    color: COLORS.white,
    textAlign: 'center'
  },
  textDark: {
    fontFamily: 'sans-serif',
    fontSize: SIZES.small + 2,
    color: COLORS.primary_text,
    textAlign: 'center'
  }
});