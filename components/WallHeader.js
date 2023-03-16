import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView, } from 'react-native'
import React from 'react'
import uuid from 'react-native-uuid';
import { WallHeaderButton } from './Buttons'
import { COLORS } from '../constants/theme'
import { getShortagedNumber } from '../utils/numShortage'
import DividerWithLine from '../components/DividerWithLine'
import { getNameInGroupHeader } from '../utils/getNameByKey';
import WallHeaderGeneralInfo from './WallHeaderGeneralInfo';
import WallHeaderCountersGrid from './WallHeaderCountersGrid';
import WallHeaderButtons from './WallHeaderButtons';

const WallHeader = ({name, membersCount, avatarUrl, status, isMember, counters, lastSeen, isOnlineUsingMobile, isOnlineUsingPC}) => {
  return (
    <View style={styles.mainContainer}>
      <WallHeaderGeneralInfo 
        name={name}
        avatarUrl={avatarUrl}
        status={status}
        lastSeen={lastSeen}
        isOnlineUsingMobile={isOnlineUsingMobile}
        isOnlineUsingPC={isOnlineUsingPC}
      />
      <WallHeaderButtons />
      <DividerWithLine dividerHeight={10}/>
      <WallHeaderCountersGrid membersCount={membersCount} counters={counters}/>
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

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
})