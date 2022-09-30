import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import { useSelector } from 'react-redux'
import {COLORS} from '../constants/theme'

const CustomDrawer = (props) => {
    const urlDrawerPhoto = useSelector(state => state.userProfileDrawerPhotoUrl)
    console.log(urlDrawerPhoto) 
    return (
    <View style={{flex: 1, backgroundColor: '#1d202d'}}>
        <DrawerContentScrollView >
            <View>

            </View>
            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({})