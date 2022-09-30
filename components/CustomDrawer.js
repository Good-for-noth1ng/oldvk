import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import { useSelector } from 'react-redux'
import {COLORS} from '../constants/theme'

const CustomDrawer = (props) => {
    const urlDrawerPhoto = useSelector(state => state.user.userProfileDrawerPhotoUrl)
    return (
    <View style={{flex: 1, backgroundColor: '#1d202d'}}>
        <DrawerContentScrollView >
            <View>
                <Image source={{uri: urlDrawerPhoto}} style={{width: 80, height: 80}}/>
            </View>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({})