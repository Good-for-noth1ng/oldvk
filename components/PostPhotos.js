import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useState} from 'react'
import uuid from 'react-native-uuid';

const PostPhotos = ({postPhotos}) => {
  const imgNum = postPhotos.length
  const rowNum = Math.ceil(imgNum / 3)
  // console.log(imgNum, rowNum)
  let grid = []
  let index = 0
  for (let i = 0; i < rowNum; i++) {
    let row = []
    for (let j = 0; j < 3; j++) {
      let imgPerRow = imgNum - Math.floor(imgNum / 3) * (i + 1)
      let width = 100 / imgPerRow + '%'
      let height = 100 / rowNum + '%'
      let lastIndexUrl = postPhotos[index]?.sizes.length - 1
      // console.log(width, height)
      // console.log(postPhotos[index]?.sizes[lastIndexUrl].url)
      let image = <Image 
        source={{uri: postPhotos[index]?.sizes[lastIndexUrl].url}}
        key={uuid.v4()}
        style={{width: width, height: height}}
      />
      index += 1
      row.push(image)
    }
    
    let rowContainer = <View style={{width: '100%', display: 'flex', flexDirection: 'row'}} key={uuid.v4()}>{row}</View>
    grid.push(rowContainer)
  }


  // const photos = postPhotos
  // const renderPhotos = photos.map(photo => (
  //   <Image 
  //     source={{uri: photo?.sizes[2].url}} 
  //     key={uuid.v4()} 
  //     // style={{width: photo?.sizes[2].width, height: photo?.sizes[2].height}}
  //     style={{width: '100%', height: 200}}
  //   />
  // ))

  return (
    <View style={styles.photosContainer}>
      {
        grid && grid
      }
    </View>
    // <View style={styles.photosContainer}>
    //     {
    //       renderPhotos && renderPhotos
    //     }
    // </View>
  )
}

export default PostPhotos

const styles = StyleSheet.create({
  photosContainer: {
    marginBottom: 10,
    marginTop: 10,
  }
})