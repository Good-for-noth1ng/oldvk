
import React from 'react'
import { Text, View, TouchableOpacity, useWindowDimensions, Dimensions, StyleSheet, Touchable } from 'react-native'
import { SIZES, COLORS } from '../constants/theme'
import Entypo from 'react-native-vector-icons/Entypo'

export const LoginButton = ({buttonText, navigation, isLightTheme }) => {  
  return (
    <TouchableOpacity style={isLightTheme ? styles.buttonContainerLight : styles.buttonContainerDark} onPress={() => navigation.navigate('WebViewLogin')}>
      <Text style={isLightTheme ? styles.textLight : styles.textDark}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  )
}

export const OptionsButton = ({buttonIcon, buttonText}) => {
  return (
    <TouchableOpacity>
      <View>
        {buttonIcon}
        <Text style={styles.buttonTextStyle}>{buttonText}</Text>
      </View>
      <Entypo name='chevron-right' color={COLORS.secondary} size={22} style={styles.optionsIcon}/>
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
  },
  optionsIcon: {
    marginLeft: 5,
    marginRight: 10
  },
  buttonTextStyle: {
    fontSize: 17,
  },
  nameAndButtonIconContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});