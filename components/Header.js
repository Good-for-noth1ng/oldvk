import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants/theme'
import { LinearGradient } from 'expo-linear-gradient'

const Header = ({screenName, isLight}) => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.black} barStyle={COLORS.white}/>
      <LinearGradient 
        style={styles.header} 
        colors={isLight ? [COLORS.gradientHeaderStart, COLORS.gradientHeaderEnd] : [COLORS.primary_dark, COLORS.black]}
      >
        <View style={styles.textLogoContainerStyle}>
          <View style={styles.logoContainerStyle}>  
            <Image 
              source={isLight ? require('../assets/icons/vk_logo_eng_blue.png') : require ('../assets/icons/vk_logo_eng_black.png')}
              style={styles.logoStyle}
            />
          </View>
          <Text style={styles.screenNameStyle}>{screenName}</Text>
        </View>
      </LinearGradient>
    </>
  )
}

export default Header

const styles = StyleSheet.create({
    logoContainerStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 10
    },
    logoStyle: {
        width: '80%',
        height: '80%',
    },
    header: {
        width: '100%',
        height: 55,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    screenNameStyle: {
      color: COLORS.white,
      fontFamily: 'sans-serif',
      fontSize: SIZES.extraLarge - 3,
    },
    textLogoContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 20,
    }
})