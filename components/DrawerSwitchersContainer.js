import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleCurrentColorScheme } from '../redux/colorSchemeSlice'
import DrawerToggler from './DrawerToggler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import { CustomDrawerButton } from './Buttons'
import { COLORS } from '../constants/theme'

const DrawerSwitchersContainer = () => {
  const dispatch = useDispatch()
  const [isOnline, setIsOnline] = useState(false)
  const [allowMarkAsRead, setAllowMarkAsRead] = useState(false)
  const [allowSeeTyping, setAllowSeeTyping] = useState(false)
  const [theme, setTheme] = useState(false)
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)

  const changeOnlineStatus = () => {
    setIsOnline(prevState => !prevState)
  }
  const changeReadStatus = () => {
    setAllowMarkAsRead(prevState => !prevState)
  }
  const changeTypingStatus = () => {
    setAllowSeeTyping(prevState => !prevState)
  }
  const changeTheme = () => {
    dispatch(toggleCurrentColorScheme())
  }
  return (
    <>
      <DrawerToggler
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
      <DrawerToggler
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
      <DrawerToggler 
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
      <DrawerToggler 
        trueIcon={
          <Octicons name='moon' size={20} color={COLORS.white}/>
        }
        falseIcon={
          <Octicons name='sun' size={20} color={COLORS.white}/>
        }
        trueText={'Dark mode'}
        falseText={'Light mode'}
        currentState={!isLightTheme}
        setNewState={changeTheme}
      />
      <CustomDrawerButton 
        buttonIcon={<MaterialCommunityIcons name='door-open' color={COLORS.white} size={20}/>}
        buttonText={'Logout'}
      />
    </>
  )
}

export default DrawerSwitchersContainer

const styles = StyleSheet.create({})