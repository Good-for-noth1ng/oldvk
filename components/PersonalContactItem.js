import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

const PersonalContactItem = ({ navigation, photo, name, descritption, ownerId }) => {
  const navToWall = () => {
    if (ownerId > 0) {
      navigation.push('UserProfile', {userid: ownerId})
    } else {
      navigation.push('Group', {id: ownerId})
    }
  }
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{uri: photo}} style={{width: 50, height: 50, borderRadius: 5}}/>
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.info}>{descritption}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PersonalContactItem

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    gap: 10
  },
  info: {
    fontSize: 16,
    color: COLORS.secondary
  },
  title: {
    fontSize: 17,
    color: COLORS.white
  }
})