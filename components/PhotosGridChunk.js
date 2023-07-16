import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

const PhotosGridChunk = ({photos}) => {
  return (
    <View style={styles.container}>
      {
        photos.data.map(photo => {
          const sizesLastIndex = photo.sizes.length - 1
          return (
            <Image 
            //   style={[styles.image, {width: photo.sizes[sizesLastIndex].width, height: photo.sizes[sizesLastIndex].height}]}
              style={{width: '32%', height: 150}}
              source={{uri: photo.sizes[sizesLastIndex].url}}
            />
          )
        })
      }
    </View>
  )
}

export default PhotosGridChunk

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white
  },
  image: {
    maxWidth: '33%'
  }
})