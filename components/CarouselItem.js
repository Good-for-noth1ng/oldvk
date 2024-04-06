import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

const CarouselItem = ({ cover, title, type, num, handlePress, isLightTheme, id }) => {
  const onPress = () => {
    handlePress()
  }
  return (
    <TouchableOpacity 
      style={[styles.container, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}
      onPress={onPress}
    >
      <Image 
        style={{width: 160, height: 110, borderRadius: 5}}
        source={{uri: cover}}
      />
      <Text style={[styles.title, isLightTheme ? {color: COLORS.black} : {color: COLORS.primary_text}]}>
        {title}
      </Text>
      <Text style={styles.quantity}>
        {num} {type === 'photos' ? 'photos' : 'videos'}
      </Text>
    </TouchableOpacity>
  )
}

export default React.memo(CarouselItem, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id
})

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