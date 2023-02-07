import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import NewsTitleSwitcher from './NewsTitleSwitcher'
import { COLORS } from '../constants/theme'

const CustomHeader = ({headerName, iconTouchHandler, iconComponent}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity activeOpacity={1} style={styles.iconContainer} onPress={iconTouchHandler}>
        {iconComponent}
      </TouchableOpacity>
      <View>
        {headerName}
      </View>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  iconContainer: {
    marginLeft: 15,
    marginRight: 35,
  }
})