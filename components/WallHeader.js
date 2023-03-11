import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView, } from 'react-native'
import React, { useEffect} from 'react'
import CustomHeader from './CustomHeader'
import { WallHeaderButton } from './Buttons'
import { COLORS } from '../constants/theme'
import { getShortagedNumber } from '../utils/numShortage'

const WallHeader = ({name, membersCount, avatarUrl, status, isMember, counters}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageNameContainer}>
        <Image source={{uri: avatarUrl}} style={styles.image}/>
        <View style={styles.additionalInfoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.wallName}>{name}</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <WallHeaderButton wallHeaderButtonText={'Subscribe'}/>
        <WallHeaderButton wallHeaderButtonText={'Message'}/>
      </View>
    </View>
  )
}

export default WallHeader

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    backgroundColor: COLORS.very_dark_gray,
  },
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
  
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})