import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView, } from 'react-native'
import React, { useEffect} from 'react'
import uuid from 'react-native-uuid';
import CustomHeader from './CustomHeader'
import { WallHeaderButton } from './Buttons'
import { COLORS } from '../constants/theme'
import { getShortagedNumber } from '../utils/numShortage'
import DividerWithLine from '../components/DividerWithLine'
import { getNameInGroupHeader } from '../utils/getNameByKey';

const WallHeader = ({name, membersCount, avatarUrl, status, isMember, counters}) => {
  let countersGrid = []
  let row = []
  if (membersCount !== undefined) {
    row.push(
      <TouchableOpacity key={uuid.v4()} style={styles.counterButton}>
        <Text style={styles.counterNumber} key={uuid.v4()}>{getShortagedNumber(membersCount)}</Text>
        <Text style={styles.counterName} key={uuid.v4()}>members</Text>
      </TouchableOpacity>
    );
  }
  for (let key in counters) {
    if (row.length === 3) {
      countersGrid.push(<View key={uuid.v4()} style={styles.counterRow}>{row}</View>)
      row = []
    }
    if(counters[key] !== 0) {
      row.push(
        <TouchableOpacity key={uuid.v4()} style={styles.counterButton}>
          <Text style={styles.counterNumber} key={uuid.v4()}>{getShortagedNumber(counters[key])}</Text>
          <Text style={styles.counterName} key={uuid.v4()}>{getNameInGroupHeader(key)}</Text>
        </TouchableOpacity>
      )
    }
  }
  if (row.length > 0) {
    countersGrid.push(<View key={uuid.v4()} style={styles.counterRow}>{row}</View>)
  }

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
        <WallHeaderButton activeStateText={'Follow'} inactiveStateText={'Unfollow'} isActiveState={!isMember}/>
        <WallHeaderButton activeStateText={'Message'} isActiveState={true}/>
      </View>
      <DividerWithLine dividerHeight={10}/>
      <View>{countersGrid}</View>
    </View>
  )
}

export default WallHeader

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    backgroundColor: COLORS.very_dark_gray,
    borderRadius: 5,
    marginTop: 5
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
    // backgroundColor: COLORS.secondary,
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
  },
  counterButton: {
    width: 105,
    height: 75,
    backgroundColor: COLORS.primary_dark,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'    
  },
  counterNumber: {
    fontSize: 17,
    color: COLORS.white
  },
  counterName: {
    fontSize: 14,
    color: COLORS.secondary
  }
})