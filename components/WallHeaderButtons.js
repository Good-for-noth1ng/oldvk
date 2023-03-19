import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import uuid from 'react-native-uuid';
import { WallHeaderButton } from './Buttons'
import DividerWithLine from './DividerWithLine';

const WallHeaderButtons = ({ isUserWall, isMember, canWritePrivateMessage, canSendFriendRequest, friendStatus }) => {
  let buttons = []
  const isFriend = friendStatus === 3 ? true : false 
  if (isUserWall) {
    if ((friendStatus === 3 || friendStatus === 0) && canSendFriendRequest === 1) {
      buttons.push(
        <WallHeaderButton key={uuid.v4()} activeStateText={'Add Friend'} inactiveStateText={'Remove from Friends'} isActiveState={!isFriend}/>
      )
      if (canWritePrivateMessage) {
        buttons.push(
          <DividerWithLine key={uuid.v4()} dividerWidth={10}/>
        )
        buttons.push(
          <WallHeaderButton key={uuid.v4()} activeStateText={'Message'} isActiveState={true}/>
        )
      }
    } else if (friendStatus === 0 && canSendFriendRequest === 0) {
      if (canWritePrivateMessage) {
        buttons.push(
          <WallHeaderButton key={uuid.v4()} activeStateText={'Message'} isActiveState={true}/>
        )
      }
    } else if (friendStatus === 1 && canSendFriendRequest === 0) {
      buttons.push(
        <WallHeaderButton key={uuid.v4()} activeStateText={'Add Friend'} inactiveStateText={'Request Sent'} isActiveState={isFriend}/>
      )
      if (canWritePrivateMessage) {
        buttons.push(
          <DividerWithLine key={uuid.v4()} dividerWidth={10}/>
        )
        buttons.push(
          <WallHeaderButton key={uuid.v4()} activeStateText={'Message'} isActiveState={true}/>
        )
      }
    }
  } else {
    buttons.push(
      <WallHeaderButton key={uuid.v4()} activeStateText={'Follow'} inactiveStateText={'Unfollow'} isActiveState={!isMember}/>
    )
    if (canWritePrivateMessage === 1) {
      buttons.push(
        <DividerWithLine key={uuid.v4()} dividerWidth={10}/>
      )
      buttons.push(
        <WallHeaderButton key={uuid.v4()} activeStateText={'Message'} isActiveState={true}/>
      )
    }
  }
  return (
    <View>
      <View style={styles.buttonsContainer}>
        {buttons}
      </View>
    </View>
    
  )
}

export default WallHeaderButtons

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
})