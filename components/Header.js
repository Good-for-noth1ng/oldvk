import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants/theme'

const Header = ({screenName}) => {
  return (
    <View style={styles.headerStyle}>
      <View style={styles.textLogoContainerStyle}>
        <View style={styles.logoContainerStyle}>  
          <Image source={
              require('../assets/icons/vk_logo_eng_blue.png')
          }
              style={styles.logoStyle}
          />
        </View>
        <Text style={styles.screenNameStyle}>{screenName}</Text>
      </View>
    </View>
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
    headerStyle: {
        width: '100%',
        height: 55,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    screenNameStyle: {
      color: COLORS.white,
      fontFamily: 'sans-serif',
      fontSize: SIZES.extraLarge - 3
    },
    textLogoContainerStyle: {
      width: '50%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: 10
    }

})