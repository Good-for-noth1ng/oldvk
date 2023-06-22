import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import uuid from 'react-native-uuid';
import { COLORS } from '../constants/theme'
import { getShortagedNumber } from '../utils/numShortage'
import { getNameInGroupHeader } from '../utils/getNameByKey';

const WallHeaderCountersGrid = ({ membersCount, counters, ownerId, navigation }) => {
  let countersGrid = []
  let row = []
  
  const navigateToFollowersList = () => {
    if (ownerId < 0) {
      // navigation.navigate('')
    } else {
      
    }
  }

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
    if (
      key !== 'online_friends' && 
      key !== 'clips_followers' && 
      key !== 'clips_views' && 
      key !== 'clips' && 
      key !== 'clips_likes' && 
      key !== 'pages'
    ) {
      if(counters[key] !== 0) {
        row.push(
          <TouchableOpacity key={uuid.v4()} style={styles.counterButton}>
            <Text style={styles.counterNumber} key={uuid.v4()}>{getShortagedNumber(counters[key])}</Text>
            <Text style={styles.counterName} key={uuid.v4()}>{getNameInGroupHeader(key)}</Text>
          </TouchableOpacity>
        )
      }
    }
  }
  if (row.length > 0) {
    countersGrid.push(<View key={uuid.v4()} style={styles.counterRow}>{row}</View>)
  }
  return (
    <View>
      {countersGrid}
    </View>
  )
}

export default WallHeaderCountersGrid

const styles = StyleSheet.create({
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 5,
    marginBottom: 5,
  },
  counterButton: {
    width: 105,
    height: 75,
    backgroundColor: COLORS.primary_dark,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  counterNumber: {
    fontSize: 17,
    color: COLORS.white
  },
  counterName: {
    fontSize: 14,
    color: COLORS.secondary
  },
})