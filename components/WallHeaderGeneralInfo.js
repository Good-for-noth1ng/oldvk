import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { COLORS } from '../constants/theme'
import { getTimeDate } from '../utils/date'

const WallHeaderGeneralInfo = ({ name, avatarUrl, lastSeen, status, isOnlineUsingMobile, isOnlineUsingPC, chevronPressHandler }) => {
  const isPersonalInfoOpen = React.useRef(false)
  const chevronRotationAnim = React.useRef(new Animated.Value(0 )).current
  const spin = chevronRotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })
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
  const onChevronPress = () => {
    if (isPersonalInfoOpen.current) {
      Animated.timing(chevronRotationAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start()
    } else {
      Animated.timing(chevronRotationAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start()
    }
    // chevronPressHandler(prevState => !prevState)
    isPersonalInfoOpen.current = !isPersonalInfoOpen.current
  }
  return (
    <View style={styles.imageNameContainer}>
      <Image source={{uri: avatarUrl}} style={styles.image}/>
      <View style={styles.additionalInfoContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.wallName}>{name}</Text>
        </View>
        {onlineStatus}
        <TouchableOpacity style={styles.chevron} onPress={onChevronPress}>
          <Animated.View style={{transform: [{rotateZ: spin}]}}>
            <Entypo name='chevron-down' color={COLORS.secondary} size={23} />
          </Animated.View>
        </TouchableOpacity>
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
  },
  chevron: {
    width: '100%',
    height: 17,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  }
})