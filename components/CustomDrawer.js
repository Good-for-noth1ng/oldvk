import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import { useSelector } from 'react-redux'
import {COLORS} from '../constants/theme'

const CustomDrawer = (props) => {
    const [urlDrawerPhoto, setUrlDrawerPhoto] = useState(useSelector(state => state.user.userProfileDrawerPhotoUrl))
    const [firstName, setFirstName] = useState(useSelector(state => state.user.firstName))
    const [lastName, setLastName] = useState(useSelector(state => state.user.lastName))
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView >
                <View>
                    <Image source={{uri: urlDrawerPhoto}} style={{width: 80, height: 80, borderRadius: 3}}/>
                    <View>
                        <Text>{firstName} {lastName}</Text>
                    </View>
                </View>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({})