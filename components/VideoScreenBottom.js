import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { getShortagedNumber } from '../utils/numShortage'
import { COLORS } from '../constants/theme'
const VideoScreenBottom = ({likes, reposts, isLiked, isLightTheme}) => {
  
  return (
    <View style={styles.iconsContainer}>
      <TouchableOpacity style={styles.iconContainer}>
        {
          isLiked ?
          <AntDesign name='heart' size={23} color={COLORS.primary}/> :
          <AntDesign name='hearto' size={23} color={COLORS.secondary}/>
        }
        <Text style={[styles.iconText]}>
          {getShortagedNumber(likes)} 
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Fontisto name='share-a' size={23} color={COLORS.secondary}/>
        <Text style={styles.iconText}>{reposts}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default VideoScreenBottom

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    // height: 30
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  iconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary
  }
})