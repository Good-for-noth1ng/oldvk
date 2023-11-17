import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Modal, Dimensions } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisio from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import ImageViewer from 'react-native-image-zoom-viewer'
import { COLORS } from '../constants/theme'
import { getDuration } from '../utils/numShortage';

const screenWidth = Dimensions.get('window').width
const CommentAttachments = ({attachments, navigation, isLightTheme}) => {
  const [isModalVisible, setISModalVisible] = React.useState(false)
  const photos = React.useRef([])
  const initRender = React.useRef(true)
  if (initRender.current) {
    for (let i = 0; i < attachments.length; i++) {
      if (attachments[i].type === 'photo') {
        let ph
        for (let j = 0; j < attachments[i].photo.sizes.length; j++) {
          if (attachments[i].photo.sizes[j].type === 'x') {
            ph = {url: attachments[i].photo.sizes[j].url}
            // console.log(attachments[i].photo.sizes[j].url)
            break
          }
        }
        if (ph === undefined) {
          // console.log(attachments[i].photo.sizes[attachments[i].photo.sizes.length - 1].url)
          photos.current.push({url: attachments[i].photo.sizes[attachments[i].photo.sizes.length - 1].url})
        } else {
          photos.current.push(ph)
        }
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
        onRequestClose={() => {setISModalVisible(prev => !prev)}}
      >
        <ImageViewer 
          imageUrls={photos.current}
          enableImageZoom={true}
          useNativeDriver={true}
          enablePreload={true}
          enableSwipeDown={true}
          renderIndicator={(currentIndex) => <></>}
          renderHeader={
            (currentIndex) => (
              <View style={{position: 'absolute', zIndex: 3, flexDirection: 'row', width: screenWidth, justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10, marginTop: 10}}>
                <View style={{flexDirection: 'row', gap: 30}}>
                  <TouchableOpacity activeOpacity={0.5} onPress={() => setISModalVisible(false)}>
                    <AntDesign name={'arrowleft'} size={25} color={COLORS.white}/>
                  </TouchableOpacity>
                  <Text style={{color: COLORS.white, fontSize: 17}}>{currentIndex + 1} of {photos.current.length}</Text>
                </View>
                <Feather name={'more-vertical'} color={COLORS.white} size={25}/>
              </View>
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
            () => {
              return (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenWidth, paddingLeft: 15, paddingRight: 15, paddingBottom: 10}}>
                  <TouchableOpacity>
                    {
                      true ?
                      <AntDesign name={'heart'} color={COLORS.primary} size={20}/> :
                      <AntDesign name={'hearto'} color={COLORS.white} size={20}/>
                    }
                  </TouchableOpacity>
                  <TouchableOpacity><MaterialCommunityIcons name={'comment-outline'} color={COLORS.white} size={20} /></TouchableOpacity>
                  <TouchableOpacity><MaterialCommunityIcons name={'share-outline'} size={20} color={COLORS.white}/></TouchableOpacity>
                </View>
              )
            } 
          }
          // index={openImageIndex.current}
        />
      </Modal>
      <View style={styles.container}>
      {
        attachments.map(attachment => {
          if (attachment.type === 'photo') {
            return (
              <TouchableOpacity activeOpacity={0.7} key={attachment.photo.id} style={styles.photo} onPress={() => setISModalVisible(prev => !prev)}>
                <Image 
                  source={{uri: attachment.photo.sizes[attachment.photo.sizes.length - 1].url}} 
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
              return (
                <View
                  style={styles.photo}
                >
                  <Image 
                    source={{uri: attachment.doc.preview.photo.sizes[attachment.doc.preview.photo.sizes.length - 1].src}}
                    style={styles.videoCover}
                  />
                  <Text style={styles.timeDuration}>GIF</Text>
                </View>
              )
            } else {
              return null
            }
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
    height: 80, //80
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: COLORS.light_smoke
  },
  photo: {
    width: '49%', // 49%
    height: '100%',
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
    width: '50%',
    height: '100%'
  }
})