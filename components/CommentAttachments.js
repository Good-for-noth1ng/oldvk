import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Modal, Dimensions, Animated } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisio from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import ImageViewer from 'react-native-image-zoom-viewer'
import CommentAudioItem from './CommentAudioItem'
import { COLORS } from '../constants/theme'
import { getDuration } from '../utils/numShortage';

const screenWidth = Dimensions.get('window').width
const CommentAttachments = ({attachments, navigation, isLightTheme, author, ownerId}) => {
  const [isModalVisible, setISModalVisible] = React.useState(false)
  const photos = React.useRef([])
  const videosNum = React.useRef(0)
  const initRender = React.useRef(true)
  const openImageIndex = React.useRef(0)
  const audios = React.useRef([])

  const shouldHideTopAndBottom = React.useRef(false)
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


  if (initRender.current) {
    let indx = 0
    let audioIndex = 0
    for (let i = 0; i < attachments.length; i++) {
      if (attachments[i].type === 'photo') {
        attachments[i].photo = {...attachments[i].photo, indxToOpen: indx}
        indx += 1
        attachments[i].photo.sizes.sort(function(a, b){return b.width - a.width})
        photos.current.push({
          url: attachments[i].photo.sizes[0].url,
          photoId:  attachments[i].photo.id,
          ownerId: ownerId,
          text: attachments[i].photo.text,
          userId: attachments[i].photo.user_id,
          date: attachments[i].photo.date,
        })
      } else if (attachments[i].type === 'doc') {
        if (attachments[i].doc.ext === 'gif') {
          // console.log(attachments[i].doc.url)
          attachments[i].doc = {...attachments[i].doc, indxToOpen: indx}
          indx += 1
          photos.current.push(
            attachments[i].doc.url ? 
            {url: attachments[i].doc.url} :  
            {url: attachment.doc.preview.photo.sizes[attachment.doc.preview.photo.sizes.length - 1].src}
          )
        }
      } else if (attachments[i].type === 'video') {
        videosNum.current += 1
      } else if (attachments[i].type === 'audio') {
        audios.current.push({...attachments[i], audioIndex})
        audioIndex += 1
      }
    }
  }
  initRender.current = false
  // console.log(photos.current)
  return (
    <>
      <Modal
        animationType='fade'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={
          () => {
            shouldHideTopAndBottom.current = false
            setISModalVisible(prev => !prev)
          }
        }
      >
        <ImageViewer 
          imageUrls={photos.current}
          enableImageZoom={true}
          useNativeDriver={true}
          enablePreload={true}
          enableSwipeDown={false}
          onClick={performHidePhotoInfoAnim}
          renderIndicator={(currentIndex) => <></>}
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
                  <TouchableOpacity activeOpacity={0.5} onPress={() => setISModalVisible(false)}>
                    <AntDesign name={'arrowleft'} size={25} color={COLORS.white}/>
                  </TouchableOpacity>
                  <Text style={{color: COLORS.white, fontSize: 17}}>{currentIndex + 1} of {photos.current.length}</Text>
                </View>
                <Feather name={'more-vertical'} color={COLORS.white} size={25}/>
              </Animated.View>
            )
          }
          renderImage={
            (props) => {
              return(
                <Image source={{uri: props.source.uri}} style={{flex: 1, width: null, height: null}} resizeMode={'contain'}/>
              )
            }
          }
          renderFooter={
            (index) => {
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
                    <Feather name={'plus'} color={COLORS.white} size={25}/>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={
                      () => navigation.push(
                        'OpenedPhoto',
                        {
                          photoUrl: photos.current[index].url,
                          photoId: photos.current[index].photoId,
                          text: photos.current[index].text,
                          userId: photos.current[index].userId,
                          ownerId: photos.current[index].ownerId,
                          date: photos.current[index].date,
                          author: author,
                          width: photos.current[index].props.style.width,
                          height: photos.current[index].props.style.height,
                        }
                      ) 
                    }
                  >
                    <MaterialCommunityIcons name={'comment-outline'} color={COLORS.white} size={20}/>
                  </TouchableOpacity>
                  <TouchableOpacity><MaterialCommunityIcons name={'share-outline'} size={20} color={COLORS.white}/></TouchableOpacity>
                </Animated.View>
              )
            } 
          }
          index={openImageIndex.current}
        />
      </Modal>
      <View 
        style={[
            styles.container, 
            photos.current.length === 2 || videosNum.current === 2 || (photos.current.length === 1 && videosNum.current === 1) ?
            {flexDirection: 'row'} : {flexDirection: 'column'}
          ]}
        >
      {
        attachments.map((attachment) => {
          if (attachment.type === 'photo') {
            return (
              <TouchableOpacity 
                activeOpacity={0.7} 
                key={attachment.photo.id} 
                style={styles.photo} 
                onPress={
                  () => {
                    openImageIndex.current = attachment.photo.indxToOpen   
                    setISModalVisible(prev => !prev);
                  }
                }
              >
                <Image 
                  source={{uri: attachment.photo.sizes[0].url}} 
                  style={{width: '100%', height: '100%', borderRadius: 5}}
                />
              </TouchableOpacity>
            )
          } else if (attachment.type === 'video') {
            return (
              <TouchableOpacity 
                style={styles.photo} 
                key={attachment.video.id}
                activeOpacity={1}
                onPress={
                  () => 
                  {
                    navigation.push(
                    'Video', 
                    {
                      ownerId: attachment.video.owner_id, 
                      videoId: attachment.video.id, 
                      accessKey: attachment.video.access_key
                    }
                  )}
                }
              >
                <Image 
                  source={{uri: attachment.video.image[attachment.video.image.length - 1].url}} 
                  style={styles.videoCover}
                />
                <View style={styles.videoTriangleContainer}>
                  <View style={styles.videoTriangle}>
                    <Entypo name='triangle-right' color={COLORS.white} size={30}/>
                  </View>
                </View>
                <Text style={styles.timeDuration}>{getDuration(attachment.video.duration)}</Text>
              </TouchableOpacity>
            )
          } else if (attachment.type === 'doc') {
            if (attachment.doc.ext === 'gif') {
              // console.log(attachment.doc)
              return (
                <TouchableOpacity
                  style={styles.photo}
                  onPress={() => {
                    openImageIndex.current = attachment.doc.indxToOpen
                    setISModalVisible(prev => !prev)
                  }}
                >
                  <Image 
                    // source={{uri: attachment.doc.preview.photo.sizes[attachment.doc.preview.photo.sizes.length - 1].src}}
                    // source={{uri: 'https://media.giphy.com/media/xT0xeCCINrlk96yc0w/giphy.gif'}}
                    source={attachment.doc.url ? { uri: attachment.doc.url} : {uri: attachment.doc.preview.photo.sizes[attachment.doc.preview.photo.sizes.length - 1].src}}
                    style={styles.videoCover}
                  />
                  <Text style={styles.timeDuration}>GIF</Text>
                </TouchableOpacity>
              )
            } else {
              return null
            }
          } else if (attachment.type === 'audio') {
            return (
              <CommentAudioItem item={attachment} isLightTheme={isLightTheme} audios={audios.current}/>
            )
          } else if (attachment.type === 'link') {
            return (
              <TouchableOpacity 
                style={styles.linkContainer}
                activeOpacity={0.8}
                onPress={() => Linking.openURL(attachment.link.url)}
              >
                <View style={styles.linkIconContainer}>
                  <Feather name='arrow-up-right' size={30} color={COLORS.secondary} />
                </View>
                <View style={styles.linkInfoContainer}>
                  <Text 
                    style={[styles.linkName, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}
                  >
                    {attachment.link.title}
                  </Text>
                  <Text style={styles.linkAddress}>
                    {attachment.link.caption}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          } else if (attachment.type === 'sticker') {
            return (
              <Image 
                source={{uri: attachment.sticker.images[attachment.sticker.images.length - 1].url}}
                style={styles.sticker}
                resizeMode='contain'
                key={attachment.sticker.sticker_id}
              />
            )
          } else {
            return null
          }
        })
      }
      </View>
    </>
    
  )
}

export default CommentAttachments

const styles = StyleSheet.create({
  container: {
    width: '85%',
    //height: 80, //80
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: COLORS.light_smoke
  },
  photo: {
    width: '49%', // 49%
    height: 80,//'100%',
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  timeDuration: {
    position: 'absolute', 
    zIndex: 3, 
    color: COLORS.white, 
    backgroundColor: COLORS.light_black, 
    opacity: 0.8,
    fontSize: 12,
    borderRadius: 5,
    bottom: 3,
    right: 3,
    padding: 3,
  },
  videoTriangleContainer: {
    position: 'absolute', 
    zIndex: 2, 
    width: '100%', 
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  videoTriangle: {
    backgroundColor: COLORS.light_black, 
    opacity: 0.9, 
    borderRadius: 5
  },
  videoCover: {
    width: '100%', 
    height: '100%', 
    borderRadius: 5,
  },
  linkIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light_smoke,
    borderRadius: 40
  },
  linkName: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  linkAddress: {
    fontSize: 13,
    color: COLORS.secondary
  },
  linkIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light_smoke,
    borderRadius: 40
  },
  linkContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    // marginTop: 5,
    // marginBottom: 5
  },
  sticker: {
    width: 100,
    height: 100
  }
})