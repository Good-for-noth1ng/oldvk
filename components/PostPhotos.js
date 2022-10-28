import { StyleSheet, Text, View, Image, Modal, TouchableOpacity } from 'react-native'
import React, {useState, useRef, useLayoutEffect} from 'react'
import uuid from 'react-native-uuid';
import { COLORS } from '../constants/theme';
import { postWidth } from '../constants/theme';
import ImageViewer from 'react-native-image-zoom-viewer'

const PostPhotos = ({postPhotos}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const imgNum = postPhotos.length
  const rowNum = Math.ceil(imgNum / 3)
  let grid = []
  let imagesForSlides = []
  let index = 0
  let height
  let resolution
  let totalHeight = 0
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
      resolution = originHeight / originWidth
      if (originWidth !== undefined) {
        height = resolution * width
      } else {
        height = 350
      }
      let imageUrl = postPhotos[index]?.sizes[lastIndexUrl].url
      imagesForSlides.push({url: imageUrl})
      let image = 
      <TouchableOpacity 
        style={{width: width, height: height}} 
        key={uuid.v4()} 
        onPress={() => {setModalVisible(!modalVisible)}}
        activeOpacity={1}
      >
        <Image 
          source={{uri: imageUrl}}
          key={uuid.v4()}
          style={{width: '100%', height: '100%'}}
        />
      </TouchableOpacity>
      index += 1
      row.push(image)
    }
    let rowContainer = <View 
      style={{
        width: '100%', 
        display: 'flex', 
        flexDirection: 'row',
        // height: height,
        // backgroundColor: COLORS.light_smoke
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
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible);}}
      >
        <ImageViewer 
          imageUrls={imagesForSlides}
          enableImageZoom={true}
        />
      </Modal>
      <View style={{
        marginBottom: 10,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.secondary
      }}>
        {
          grid && grid
        }
      </View>
    </>
  )
}

export default PostPhotos

const styles = StyleSheet.create({
  
})