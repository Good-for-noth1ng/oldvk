import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import { useSelector } from 'react-redux'
import {COLORS} from '../constants/theme'

const CustomDrawer = (props) => {
    const urlDrawerPhoto = useSelector(state => state.user.userProfileDrawerPhotoUrl)
    const firstName = useSelector(state => state.user.firstName)
    const lastName = useSelector(state => state.user.lastName)
    return (
        <View style={{flex: 1, backgroundColor: COLORS.very_dark_gray}}>
            <DrawerContentScrollView>
                <TouchableOpacity style={styles.profileDrawerContainer} activeOpacity={1}>
                    <Image source={{uri: urlDrawerPhoto}} style={styles.profileImageStyle}/>
                    <View>
                        <Text style={styles.profileName}>{firstName} {lastName}</Text>
                    </View>
                </TouchableOpacity>
                <DrawerItemList {...props}/>
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