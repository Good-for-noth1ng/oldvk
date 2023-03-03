import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
const CommentPhotos = ({commentPhotos}) => {
  const imgNum = commentPhotos.length
  const images = []
  const photoVariants = commentPhotos[0].sizes.length
  for (let i = 0; i < photoVariants; i++) {
    images.push({width: commentPhotos[0].sizes[i].width, height:commentPhotos[0].sizes[i].height, uri: commentPhotos[0].sizes[i].url})
  }
  return (
    <View style={styles.photosContainer}>
        <Image source={images} style={styles.photo}/>
    </View>
  )
}

export default CommentPhotos

const styles = StyleSheet.create({
  photosContainer: {
    width: '85%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: COLORS.light_smoke
  },
  photo: {
    width: '50%',
    height: '100%',
    borderRadius: 5
  }
})