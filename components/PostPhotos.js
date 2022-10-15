import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useState} from 'react'
import uuid from 'react-native-uuid';

const PostPhotos = ({postPhotos}) => {
  // const imgNum = postPhotos.length
  // const rowNum = Math.ceil(imgNum / 3)
  // let grid = []
  // let index = 0
  // for (let i = 0; i < rowNum; i++) {
  //   let row = []
  //   for (let j = 0; j < 3; j++) {
  //     let imgPerRow = imgNum - Math.floor(imgNum / 3) * (i + 1)
  //     let width = toString(100 / imgPerRow).concat('%')
  //     let height = toString(100 / rowNum).concat('%')
  //     let lastIndexUrl = postPhotos[index]?.sizes.length - 1
  //     let image = <Image 
  //       source={{uri: postPhotos[index]?.sizes[lastIndexUrl]}}
  //       key={uuid.v4()}
  //       style={{width: 200, height: 200}}
  //     />
  //     index += 1
  //     row.push(image)
  //   }
  //   let rowContainer = <View style={{width: '100%'}} key={uuid.v4()}>{row}</View>
  //   grid.push(rowContainer)
  // }
  const photos = postPhotos
  const renderPhotos = photos.map(photo => (
    <Image 
      source={{uri: photo?.sizes[2].url}} 
      key={uuid.v4()} 
      // style={{width: photo?.sizes[2].width, height: photo?.sizes[2].height}}
      style={{width: '100%', height: 200}}
    />
  ))

  return (
    <View style={styles.photosContainer}>
        {
          renderPhotos && renderPhotos
        }
    </View>
  )
}

export default PostPhotos

const styles = StyleSheet.create({
  photosContainer: {
    marginBottom: 10,
    marginTop: 10,
  }
})