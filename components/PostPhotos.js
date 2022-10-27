import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React, {useState, useRef, useLayoutEffect} from 'react'
import uuid from 'react-native-uuid';
import { COLORS } from '../constants/theme';
import { postWidth } from '../constants/theme';

const PostPhotos = ({postPhotos}) => {
  const imgNum = postPhotos.length
  const rowNum = Math.ceil(imgNum / 3)
  let grid = []
  let index = 0
  for (let i = 0; i < rowNum; i++) {
    let row = []
    for (let j = 0; j < 3; j++) {
      let imgPerRow = 3
      if (i == rowNum - 1) {
        imgPerRow = Math.floor(imgNum / 3)
      }
      if (rowNum == 1) {
        imgPerRow = imgNum
      }
      
      let widthPercent = 100 / imgPerRow
      let width = postWidth * (widthPercent / 100)
      let lastIndexUrl = postPhotos[index]?.sizes.length - 1
      let originHeight = postPhotos[index]?.sizes[lastIndexUrl].height
      let originWidth = postPhotos[index]?.sizes[lastIndexUrl].width
      let resolution = originHeight / originWidth
      let height
      if (originWidth !== undefined) {
        height = resolution * width
      } else {
        height = 350
      }
      let image = <Image 
        source={{uri: postPhotos[index]?.sizes[lastIndexUrl].url}}
        key={uuid.v4()}
        style={{width: width, height: height}}
      />
      index += 1
      row.push(image)
    }
    let rowContainer = <View style={styles.rowContainer} key={uuid.v4()}>{row}</View>
    grid.push(rowContainer)
  }

  return (
    <View style={{
      marginBottom: 10,
      marginTop: 10,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {
        grid && grid
      }
    </View>
  )
}

export default PostPhotos

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%', 
    display: 'flex', 
    flexDirection: 'row',
    backgroundColor: COLORS.light_smoke
  }
})