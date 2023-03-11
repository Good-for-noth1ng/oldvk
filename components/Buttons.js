
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

export const OptionsButton = ({buttonIcon, buttonText, isLightTheme, buttonPressHandler}) => {
  return (
    <TouchableOpacity style={isLightTheme ? styles.optionsButtonContainerLight : styles.optionsButtonContainerDark} onPress={buttonPressHandler}>
      <View style={styles.nameAndButtonIconContainer}>
        {buttonIcon}
        <Text style={isLightTheme ? styles.buttonTextStyleLight : styles.buttonTextStyleDark}>{buttonText}</Text>
      </View>
      <Entypo name='chevron-right' color={COLORS.secondary} size={22} style={styles.optionsIcon}/>
    </TouchableOpacity>
  )
}

export const WallHeaderButton = ({ wallHeaderButtonText }) => {
  return (
    <TouchableOpacity style={styles.wallHeaderButton}>
      <Text style={styles.wallHeaderButtonTextStyle}>{wallHeaderButtonText}</Text>
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
  buttonTextStyleLight: {
    fontSize: 17,
    color: COLORS.black
  },
  buttonTextStyleDark: {
    fontSize: 17,
    color: COLORS.primary_text
  },
  nameAndButtonIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',    
  },
  optionsButtonContainerLight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: COLORS.white
  },
  optionsButtonContainerDark: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: COLORS.primary_dark
  },

  wallHeaderButton: {
    backgroundColor: COLORS.primary,
    height: 35,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  wallHeaderButtonTextStyle: {
    color: COLORS.white,
    fontSize: 17
  }
});