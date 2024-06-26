import { StyleSheet, Text, View, Image, Modal, TouchableOpacity, Dimensions, Touchable, Animated, StatusBar } from 'react-native'
import React, {useState,  memo } from 'react'
import uuid from 'react-native-uuid';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisio from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import { COLORS } from '../constants/theme';
import { postWidth } from '../constants/theme';
import ImageViewer from 'react-native-image-zoom-viewer'
import OpenedPhotoBottom from './OpenedPhotoBottom';


const screenWidth = Dimensions.get('window').width
const PostPhotos = ({postPhotos, navigation, ownerId, date, author}) => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const shouldHideTopAndBottom = React.useRef(false)
  const openImageIndex = React.useRef(0)
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

  const hidePhotoInfoAnim = React.useRef(new Animated.Value(0)).current
  const moveUp = hidePhotoInfoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50]
  })
  const moveDown = hidePhotoInfoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50]
  })
  
  const performHidePhotoInfoAnim = () => {
    if (shouldHideTopAndBottom.current) {
      Animated.timing(hidePhotoInfoAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start()
    } else {
      Animated.timing(hidePhotoInfoAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start()
    }
    shouldHideTopAndBottom.current = !shouldHideTopAndBottom.current
  }

  const initPhoto = (width, imageUrl, resizeMode, indexForOpen) => {
    return (
    <TouchableOpacity  
        style={{width: width, height: '100%', display: 'flex',}}  
        key={uuid.v4()} 
        onPress={() => {
          openImageIndex.current = indexForOpen
          setModalVisible(!modalVisible)
        }}
        activeOpacity={1}
      >
        <Image 
          source={{uri: imageUrl}}
          style={{width: '100%', height: '100%'}}
          // style={{flex: 1, width: null, height: null}}
          // resizeMode={'contain'}
        />
    </TouchableOpacity>)
  }
  let indexForOpen = 0
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
      let text = postPhotos[index]?.text
      let photoId = postPhotos[index]?.id
      let userId = postPhotos[index]?.user_id
      resolution = originHeight / originWidth
      if (originWidth !== undefined) {
        height = resolution * width
      } else {
        height = 350
      }
      // let imageUrl = postPhotos[index]?.sizes[lastIndexUrl].url
      // if (imageUrl === 'https://sun9-67.userapi.com/impg/upvqOAKZAzuDyd6RB66YTjnnRnj1sXpO9-9sYw/wAigjndoQgI.jpg?size=510x340&quality=95&crop=345,0,559,373&sign=dd24e89a515e9fe5a529f41ee9967a0a&c_uniq_tag=AbaGeU0zHtFHSCohsPZLuBdN2X0NqtbJ6_fpvbpkVuc&type=album') {
      //   console.log(postPhotos[index]?.sizes)
      // }
      let imageUrl
      for (let i = 0; i < lastIndexUrl; i++) {
        if (postPhotos[index]?.sizes[i].type === 'x') {
          imageUrl = postPhotos[index]?.sizes[i].url
        }
      }
      if (imageUrl === undefined) {
        imageUrl = postPhotos[index]?.sizes[lastIndexUrl].url
      }
      //postPhotos[index]?.sizes[lastIndexUrl].url
      imageUrls.push(imageUrl)
      calcImageHeights.push(height)
      if (imageUrl !== undefined) {
        imagesForSlides.push({url: imageUrl, text: text, photoId: photoId, userId: userId, albumId: postPhotos[index].album_id})
      }
      // let image = initPhoto(width=width, imageUrl=imageUrl)
      index += 1
      // row.push(image)
    }
    for (let k = 0; k < imgPerRow; k++) {
      let image = initPhoto(Math.max(...widthOfImages), imageUrls[k], resizeMode, indexForOpen)
      indexForOpen += 1
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
  // console.log(imagesForSlides)
  return (
    <>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={
          () => {
            shouldHideTopAndBottom.current = false
            setModalVisible(false);
          }
        }
      >
        <ImageViewer 
          imageUrls={imagesForSlides}
          enableImageZoom={true}
          useNativeDriver={true}
          enablePreload={true}
          enableSwipeDown={false}
          renderIndicator={(currentIndex) => <></>}
          saveToLocalByLongPress={false}
          renderHeader={
            (currentIndex) => (
              <Animated.View 
                style={{
                  position: 'absolute', 
                  zIndex: 3, 
                  flexDirection: 'row', 
                  width: screenWidth, 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  paddingLeft: 10, 
                  paddingRight: 10, 
                  marginTop: 10, 
                  transform: [{translateY: moveUp}]
                }}
              >
                <View style={{flexDirection: 'row', gap: 30}}>
                  <TouchableOpacity activeOpacity={0.5} onPress={() => setModalVisible(false)}>
                    <AntDesign name={'arrowleft'} size={25} color={COLORS.white}/>
                  </TouchableOpacity>
                  <Text style={{color: COLORS.white, fontSize: 17}}>{currentIndex + 1} of {imagesForSlides.length}</Text>
                </View>
                <Feather name={'more-vertical'} color={COLORS.white} size={25}/>
              </Animated.View>
            )
          }
          renderImage={
            (props) => {
              // console.log(props.source.uri)
              return(
                <Image source={{uri: props.source.uri}} style={{flex: 1, width: null, height: null}} resizeMode={'contain'}/>
              )
            }
          }
          renderFooter={
            (index) => {
              // console.log(props)
              return (
              <Animated.View 
                style={{
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  width: screenWidth, 
                  paddingLeft: 15, 
                  paddingRight: 15, 
                  paddingBottom: 10, 
                  transform: [{translateY: moveDown}]
                }}
              >
                <TouchableOpacity>
                {
                  <Feather name={'plus'} color={COLORS.white} size={25} />
                }
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={
                    () => navigation.push(
                      'OpenedPhoto', 
                      {
                        photoUrl: imagesForSlides[index].url,
                        photoId: imagesForSlides[index].photoId,
                        text: imagesForSlides[index].text,
                        userId: imagesForSlides[index].userId,
                        ownerId: ownerId, 
                        date: date, 
                        author: author,
                        albumId: imagesForSlides[index].albumId,  
                        width: imagesForSlides[index].props.style.width, 
                        height: imagesForSlides[index].props.style.height,
                      }
                    )
                  }
                >
                  <MaterialCommunityIcons name={'comment-outline'} color={COLORS.white} size={20} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialCommunityIcons name={'share-outline'} size={22} color={COLORS.white}/>
                </TouchableOpacity>
              </Animated.View>
              )
            }
          }
          onClick={performHidePhotoInfoAnim}
          // footerContainerStyle={{tra}}
          index={openImageIndex.current}
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