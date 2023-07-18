import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
const CarouselItem = ({ cover, title, type, num, handlePress, isLightTheme }) => {
  let titleText = title.slice(0, 15)
  if (titleText !== title) {
    titleText += '...'
  }
  return (
    <TouchableOpacity style={[styles.container, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
      <Image 
        style={{width: 160, height: 110, borderRadius: 5}}
        source={{uri: cover}}
      />
      <Text style={styles.title}>{titleText}</Text>
      <Text style={styles.quantity}>{num} {type === 'photos' ? 'photos' : 'videos'}</Text>
    </TouchableOpacity>
  )
}

export default CarouselItem

const styles = StyleSheet.create({
  container: {
    
  },
  title: {
    fontSize: 16
  },
  quantity: {
    fontSize: 15,
    color: COLORS.secondary
  }
})