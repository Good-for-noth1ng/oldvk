import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import { useDispatch, useSelector } from 'react-redux'
import {COLORS} from '../constants/theme'
import DrawerSwitchersContainer from './DrawerSwitchersContainer'
import { setID } from '../redux/userWallSlice'


const CustomDrawer = (props) => {
  const userData = useSelector(state => state.user)
  const urlDrawerPhoto = userData.userProfileDrawerPhotoUrl
  const firstName = userData.firstName
  const lastName = userData.lastName
  const { navigation } = props
  const dispatch = useDispatch()
  const goToUserProfilePage = () => {
    dispatch(setID(userData.userId))
    navigation.navigate('UserProfile')
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.very_dark_gray}}>
      <DrawerContentScrollView>
        <TouchableOpacity style={styles.profileDrawerContainer} activeOpacity={0.8} onPress={goToUserProfilePage}>
          <Image source={{uri: urlDrawerPhoto}} style={styles.profileImageStyle}/>
          <View>
            <Text style={styles.profileName}>{firstName} {lastName}</Text>
          </View>
        </TouchableOpacity>
        <DrawerItemList {...props}/>
        <DrawerSwitchersContainer />
      </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
    profileDrawerContainer: {
        width: '89%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        // backgroundColor: COLORS.light_smoke,
        justifyContent: 'flex-start'
    },
    profileImageStyle: {
        width: 80, 
        height: 80, 
        borderRadius: 5
    },
    profileName: {
        marginLeft: 15,
        color: COLORS.white
    },
    drawerContainer: {
        backgroundColor: COLORS.very_dark_gray,
    }
})