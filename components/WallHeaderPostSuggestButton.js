import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import { COLORS } from '../constants/theme'

const WallHeaderPostSuggestButton = ({canPost, canSuggest}) => {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.suggestButton}>
        <Text style={styles.suggestButtonText}>{canPost ? 'Write a post' : 'Suggest a post'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addPhotoButton}>
        <Octicons color={COLORS.white} size={24} name={'device-camera'}/>
      </TouchableOpacity>
    </View>
  )
}

export default WallHeaderPostSuggestButton

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  suggestButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    width: '75%',
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  suggestButtonText: {
    fontSize: 17,
    color: COLORS.white
  },
  addPhotoButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    width: '22%',
    flexDirection: 'row',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  }
})