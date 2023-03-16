import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { COLORS } from '../constants/theme'
import { getTimeDate } from '../utils/date'

const WallHeaderGeneralInfo = ({ name, avatarUrl, lastSeen, status, isOnlineUsingMobile, isOnlineUsingPC }) => {
  let onlineStatus
  if (lastSeen !== undefined && !isOnlineUsingMobile && !isOnlineUsingPC) {
    if (lastSeen.platform > 5) {
      onlineStatus = (
        <View style={styles.onlineStatusContainer}>
          <Ionicons name='phone-portrait-sharp' color={COLORS.secondary} size={14}/>
          <Text style={styles.onlineStatusText}> {getTimeDate(lastSeen.time)}</Text>
        </View>
      )
    } else {
      onlineStatus = (
        <View style={styles.onlineStatusContainer}>
          <MaterialIcons name='computer' color={COLORS.secondary} size={14}/>
          <Text style={styles.onlineStatusText}> {getTimeDate(lastSeen.time)}</Text>
        </View>
      )
    }
  } else if (lastSeen !== undefined) {
    if (isOnlineUsingMobile) {
      onlineStatus = (
        <View style={styles.onlineStatusContainer}>
          <Ionicons name='phone-portrait-sharp' color={COLORS.secondary} size={14}/>
          <Text style={styles.onlineStatusText}> online</Text>
        </View>
      )
    } else {
      onlineStatus = (
        <View style={styles.onlineStatusContainer}>
          <MaterialIcons name='computer' color={COLORS.secondary} size={14}/>
          <Text style={styles.onlineStatusText}> online</Text>
        </View>
      )
    }   
  } else {
    onlineStatus = null
  }
  return (
    <View style={styles.imageNameContainer}>
      <Image source={{uri: avatarUrl}} style={styles.image}/>
      <View style={styles.additionalInfoContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.wallName}>{name}</Text>
        </View>
        {onlineStatus}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
    </View>
  )
}

export default WallHeaderGeneralInfo

const styles = StyleSheet.create({
  imageNameContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5
  },
  additionalInfoContainer: {
    marginLeft: 10,
    width: '73%'
  },
  nameContainer: {
    width: '90%', 
  },
  statusContainer: {
    width: '88%', 
    marginBottom: 10,
  },
  wallName: {
    fontSize: 18,
    color: COLORS.white,
  },
  statusText: {
    color: COLORS.secondary
  },
  onlineStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  onlineStatusText: {
    color: COLORS.secondary,
    fontSize: 14
  }
})