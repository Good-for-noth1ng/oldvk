import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
import { useDispatch } from 'react-redux'
import { setID } from '../redux/groupSlice'

const GroupListItem = ({data, navigation}) => {
    const dispatch = useDispatch()
    let name = data.name.slice(0,30)
    if (name !== data.name) {
        name += '...'
    }
    const handleOnPress = () => {
      dispatch(setID(data.id))
      navigation.navigate('Group')
    }
    return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleOnPress} style={styles.groupIitemContainer}>
      <Image source={{uri:data.photo_100}} style={styles.image}/>  
      <Text style={styles.groupName}>{name}</Text>
    </TouchableOpacity>
  )
}

export default GroupListItem

const styles = StyleSheet.create({
    groupIitemContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: COLORS.white,
    },
    image: {
        width: 50, 
        height: 50,
        borderRadius: 4
    },
    groupName: {
        marginLeft: 10,
        fontSize: 15,
    }
})