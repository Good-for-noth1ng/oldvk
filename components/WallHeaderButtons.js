import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import uuid from 'react-native-uuid';
import { WallHeaderButton } from './Buttons'
import DividerWithLine from './DividerWithLine';

const WallHeaderButtons = ({ isUserWall, isMember, canWritePrivateMessage, canSendFriendRequest, friendStatus, memberStatus, groupId, accessToken }) => {
  let buttons = []
  const isFriend = friendStatus === 3 ? true : false 
  
  const joinCommunity = async () => {
    const url = `https://api.vk.com/method/groups.join?access_token=${accessToken}&v=5.131&group_id=${groupId}`
    const response = await fetch(url) 
    const parsedResponse = await response.json()
    // console.log(parsedResponse)
  }

  const leaveCommunity = async () => {
    const url = `https://api.vk.com/method/groups.leave?access_token=${accessToken}&v=5.131&group_id=${groupId}`
    const response = await fetch(url) 
    const parsedResponse = await response.json()
  }

  if (isUserWall) {
    // 0 — не является другом
    // 1 — отправлена заявка/подписка пользователю
    // 2 — имеется входящая заявка/подписка от пользователя
    // 3 — является другом
    if ((friendStatus === 3 || friendStatus === 0) && canSendFriendRequest === 1) {
      buttons.push(
        <WallHeaderButton 
          key={uuid.v4()} 
          activeStateText={'Add Friend'} 
          inactiveStateText={'Remove from Friends'} 
          isActiveState={!isFriend}
        />
      )
      if (canWritePrivateMessage) {
        buttons.push(
          <DividerWithLine key={uuid.v4()} dividerWidth={10}/>
        )
        buttons.push(
          <WallHeaderButton 
            key={uuid.v4()} 
            activeStateText={'Message'} 
            isActiveState={true}
          />
        )
      }
    } else if (friendStatus === 0 && canSendFriendRequest === 0) {
      if (canWritePrivateMessage) {
        buttons.push(
          <WallHeaderButton 
            key={uuid.v4()} 
            activeStateText={'Message'} 
            isActiveState={true}
          />
        )
      }
    } else if (friendStatus === 1 && canSendFriendRequest === 0) {
      buttons.push(
        <WallHeaderButton 
          key={uuid.v4()} 
          activeStateText={'Add Friend'} 
          inactiveStateText={'Request Sent'} 
          isActiveState={isFriend}
        />
      )
      if (canWritePrivateMessage) {
        buttons.push(
          <DividerWithLine key={uuid.v4()} dividerWidth={10}/>
        )
        buttons.push(
          <WallHeaderButton 
            key={uuid.v4()} 
            activeStateText={'Message'} 
            isActiveState={true}
            shouldAlwaysBeActive={true}
          />
        )
      }
    }
  } else {
    // 0 — не является участником;
    // 1 — является участником;
    // 2 — не уверен, что посетит мероприятие;
    // 3 — отклонил приглашение;
    // 4 — запрос на вступление отправлен;
    // 5 — приглашен.
    buttons.push(
      <WallHeaderButton 
        key={uuid.v4()} 
        activeStateText={'Follow'} 
        inactiveStateText={'Unfollow'} 
        isActiveState={!isMember}
        switchToInactiveStateHandler={joinCommunity}
        switchToActiveStateHandler={leaveCommunity}
      />
    )
    if (canWritePrivateMessage === 1) {
      buttons.push(
        <DividerWithLine key={uuid.v4()} dividerWidth={10}/>
      )
      buttons.push(
        <WallHeaderButton 
          key={uuid.v4()} 
          activeStateText={'Message'} 
          isActiveState={true}
          shouldAlwaysBeActive={true}
        />
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