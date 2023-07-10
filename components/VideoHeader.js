import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { COLORS } from '../constants/theme'
import { getTimeDate } from '../utils/date'

const VideoHeader = ({ ownerId, date, isLightTheme, navigation, name, imgUrl }) => {

  const onProfilePress = () => {
    if (ownerId > 0) {
      navigation.push('UserProfile', { userId: ownerId })
    } else {
      navigation.push('Group', { groupId: -1 * ownerId })
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.vidPubContainer} onPress={onProfilePress}>
        <Image source={{uri: imgUrl}} style={styles.image}/>
        <View>
          <Text style={[styles.name, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>{name}</Text>
          <Text style={styles.date}>{getTimeDate(date)}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.actionsContainer}>
        <TouchableOpacity>
          <Feather name='user-plus' size={23} color={COLORS.secondary}/>  
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name='more-vertical' size={23} color={COLORS.secondary}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default VideoHeader

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  vidPubContainer: {
    flexDirection: 'row',
    gap: 10
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 5
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  date: {
    color: COLORS.secondary
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 10
  }
})