import { StyleSheet, Text, View, Image, Modal, TouchableOpacity } from 'react-native'
import React, {useState,  memo } from 'react'
import uuid from 'react-native-uuid';
import { COLORS } from '../constants/theme';
import { postWidth } from '../constants/theme';
import ImageViewer from 'react-native-image-zoom-viewer'

const PostPhotos = ({postPhotos}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const imgNum = postPhotos.length
  const rowNum = Math.ceil(imgNum / 3)
  const columnNum = 3
  let grid = []
  let imagesForSlides = []
  let index = 0
  let height
  let resolution
  let totalHeight = 0
  let calcWidth
  
  const initPhoto = (width, imageUrl, resizeMode) => {
    return (
    <TouchableOpacity  
        style={{width: width, height: '100%', display: 'flex',}}  
        key={uuid.v4()} 
        onPress={() => {setModalVisible(!modalVisible)}}
        activeOpacity={1}
      >
        <Image 
          source={{uri: imageUrl}}
          style={{width: '100%', height: '100%'}}
          // resizeMode={resizeMode}
        />
    </TouchableOpacity>)
  }
  for (let i = 0; i < rowNum; i++) {
    let row = []
    let calcImageHeights = []
    let widthOfImages = []
    let imgPerRow = 3
    let imageUrls = []
    let resizeMode
    for (let j = 0; j < columnNum; j++) {
      if (i == rowNum - 1) {
        imgPerRow = imgNum - (rowNum - 1) * 3;
        resizeMode = 'stretch' 
      }
      if (rowNum == 1) {
        imgPerRow = imgNum
        resizeMode = 'contain'
      }
      let widthPercent = 100 / imgPerRow
      let width = postWidth * (widthPercent / 100)
      widthOfImages.push(width)
      let lastIndexUrl
      if (postPhotos[index]?.sizes.length > 9) {
        lastIndexUrl = postPhotos[index]?.sizes.length - 1
      } else {
        lastIndexUrl = postPhotos[index]?.sizes.length - 1
      }
       
      let originHeight = postPhotos[index]?.sizes[lastIndexUrl].height
      let originWidth = postPhotos[index]?.sizes[lastIndexUrl].width
      resolution = originHeight / originWidth
      if (originWidth !== undefined) {
        height = resolution * width
      } else {
        height = 350
      }
      let imageUrl = postPhotos[index]?.sizes[lastIndexUrl].url
      imageUrls.push(imageUrl)
      calcImageHeights.push(height)
      imagesForSlides.push({url: imageUrl})
      // let image = initPhoto(width=width, imageUrl=imageUrl)
      index += 1
      // row.push(image)
    }
    for (let k = 0; k < imgPerRow; k++) {
      let image = initPhoto(Math.max(...widthOfImages), imageUrls[k], resizeMode)
      row.push(image)
    }
    let rowHeight = Math.min(...calcImageHeights)
    if (rowHeight < 40) {
      rowHeight += 40 
    }
    let rowContainer = <View 
      style={{ 
        flexDirection: 'row',
        height: rowHeight ? rowHeight : 200,
        padding: 0,
      }} 
      key={uuid.v4()}>
        {row}
    </View>
    totalHeight += height
    grid.push(rowContainer)

  }
  return (
    <>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible);}}
      >
        <ImageViewer 
          imageUrls={imagesForSlides}
          enableImageZoom={true}
          useNativeDriver={true}
          enablePreload={true}
          enableSwipeDown={true}
        />
      </Modal>
      <View style={styles.gridStyle}>
        {
          grid && grid
        }
      </View>
    </>
  )
}

export default PostPhotos

const styles = StyleSheet.create({
  gridStyle: {
    // marginBottom: 10
  }
})