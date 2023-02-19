import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DrawerSetOnlineToggler from './DrawerSetOnlineToggler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { COLORS } from '../constants/theme'

const DrawerSwitchersContainer = () => {
  const [isOnline, setIsOnline] = useState(false)
  const [allowMarkAsRead, setAllowMarkAsRead] = useState(false)
  const [allowSeeTyping, setAllowSeeTyping] = useState(false)
  const changeOnlineStatus = () => {
    setIsOnline(prevState => !prevState)
  }
  const changeReadStatus = () => {
    setAllowMarkAsRead(prevState => !prevState)
  }
  const changeTypingStatus = () => {
    setAllowSeeTyping(prevState => !prevState)
  }
  return (
    <>
      <DrawerSetOnlineToggler
        trueIcon={
          <MaterialCommunityIcons name='ghost-off-outline' size={20} color={COLORS.white}/>
        } 
        falseIcon={
          <MaterialCommunityIcons name='ghost-outline' size={20} color={COLORS.white}/>
        }
        currentState={isOnline}
        setNewState={changeOnlineStatus}
        falseText={'Offline'}
        trueText={'Online'}
      />
      <DrawerSetOnlineToggler
        trueIcon={
          <SimpleLineIcons name='envelope-open' size={20} color={COLORS.white}/>
        }
        falseIcon={
          <SimpleLineIcons name='envelope' size={20} color={COLORS.white}/>
        }
        trueText={'Mark as read'}
        falseText={'Mark as unread'}
        currentState={allowMarkAsRead}
        setNewState={changeReadStatus}
      />
      <DrawerSetOnlineToggler 
        trueIcon={
          <MaterialCommunityIcons name='pencil-outline' size={20} color={COLORS.white}/>
        }
        falseIcon={
          <MaterialCommunityIcons name='pencil-off-outline' size={20} color={COLORS.white}/>
        }
        trueText={'Show typing'}
        falseText={'Hide typing'}
        currentState={allowSeeTyping}
        setNewState={changeTypingStatus}
      />
    </>
  )
}

export default DrawerSwitchersContainer

const styles = StyleSheet.create({})