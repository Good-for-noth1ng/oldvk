import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const GroupListItem = ({data}) => {
    let name = data.name.slice(0,30)
    if (name !== data.name) {
        name += '...'
    }
    return (
    <View style={styles.groupIitemContainer}>
      <Image source={{uri:data.photo_100}} style={styles.image}/>  
      <Text style={styles.groupName}>{name}</Text>
    </View>
  )
}

export default GroupListItem

const styles = StyleSheet.create({
    groupIitemContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15
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