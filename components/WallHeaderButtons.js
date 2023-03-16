import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WallHeaderButton } from './Buttons'

const WallHeaderButtons = ({ isMember }) => {
  return (
    <View style={styles.buttonsContainer}>
      <WallHeaderButton activeStateText={'Follow'} inactiveStateText={'Unfollow'} isActiveState={!isMember}/>
      <WallHeaderButton activeStateText={'Message'} isActiveState={true}/>
    </View>
  )
}

export default WallHeaderButtons

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})