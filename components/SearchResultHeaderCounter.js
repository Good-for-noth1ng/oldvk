import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

const SearchResultHeaderCounter = ({ counterNum, isLightTheme, counterName }) => {
  return (
    <View style={isLightTheme ? styles.containerLight : styles.containerDark}>
      <Text style={isLightTheme ? styles.textNameLight : styles.textNameDark}>{counterName}   </Text>
      <Text style={styles.textNum}>{counterNum}</Text>
    </View>
  )
}

export default SearchResultHeaderCounter

const styles = StyleSheet.create({
  containerLight: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    paddingLeft: 10
  },
  containerDark: {
    backgroundColor: COLORS.primary_dark,
    flexDirection: 'row',
    paddingLeft: 10
  },
  textNameLight: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  textNameDark: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary_text,
  },
  textNum: {
    color: COLORS.secondary,
    fontSize: 14
  }
})