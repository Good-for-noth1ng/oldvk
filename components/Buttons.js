
import React from 'react'
import { Text, View, TouchableOpacity, useWindowDimensions, Dimensions, StyleSheet, Touchable } from 'react-native'
import { SIZES, COLORS } from '../constants/theme'
import Entypo from 'react-native-vector-icons/Entypo'


export const CustomDrawerButton = ({ buttonIcon, buttonText, pressHandler }) => {
  return (
    <TouchableOpacity style={styles.drawerButtonContainer} onPress={pressHandler}>
      <View>{buttonIcon}</View>
      <Text style={styles.drawerButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

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

export const WallHeaderButton = ({ isActiveState, activeStateText, inactiveStateText, buttonWidth }) => {
  return (
    <TouchableOpacity style={{
      backgroundColor: isActiveState ? COLORS.primary : COLORS.secondary,
      height: 45,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5
    }}>
      <Text style={styles.wallHeaderButtonTextStyle}>{isActiveState ? activeStateText : inactiveStateText}</Text>
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
    backgroundColor: COLORS.white,
    borderRadius: 5,
  },
  optionsButtonContainerDark: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: COLORS.primary_dark,
    borderRadius: 5,
  },

  wallHeaderButtonActiveState: {
    backgroundColor: COLORS.primary,
    height: 45,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  wallHeaderButtonInactiveState: {
    backgroundColor: COLORS.secondary,
    height: 45,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },

  wallHeaderButtonTextStyle: {
    color: COLORS.white,
    fontSize: 17,
    textAlign: 'center'
  },

  drawerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 19,
    height: 50
    // backgroundColor: COLORS.light_smoke,
  },
  drawerButtonText: {
    color: COLORS.white,
    fontSize: 15,
    marginLeft: 25,
  }
});