import { StyleSheet, Text, View, TouchableOpacity, Platform, Image, Modal, Dimensions } from 'react-native'
import React from 'react'
import uuid from 'react-native-uuid';
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as FileSystem from 'expo-file-system'
import { shareAsync } from 'expo-sharing'
import ImageViewer from 'react-native-image-zoom-viewer'
import { postWidth } from '../constants/theme';
import { COLORS } from '../constants/theme'
import PostFile from './PostFile'

const screenWidth = Dimensions.get('window').width
const PostFiles = ({postDocs, isLightTheme}) => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const openImageIndex = React.useRef(0)
  return (
    <>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible);}}
      >
        <ImageViewer 
          imageUrls={
            postDocs.map(doc => {
              if (doc.ext === 'png' || doc.ext === 'jpg' || doc.ext === 'jpeg' || doc.ext === 'gif') {
                doc.preview.photo.sizes.sort(function(a, b){return b.width - a.width})
                return {url: doc.preview.photo.sizes[0].src}
              }
            })
          }
          enableImageZoom={true}
          useNativeDriver={true}
          enablePreload={true}
          renderIndicator={(currentIndex) => <></>}
          renderHeader={
            (currentIndex) => {
              return (
                <View style={{position: 'absolute', zIndex: 3, flexDirection: 'row', width: screenWidth, justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10, marginTop: 10}}>
                  <View style={{flexDirection: 'row', gap: 30}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => setModalVisible(false)}>
                      <AntDesign name={'arrowleft'} size={25} color={COLORS.white}/>
                    </TouchableOpacity>
                    <Text style={{color: COLORS.white, fontSize: 17}}>
                      {currentIndex + 1} of {
                        postDocs.map(doc => {
                          if (doc.ext === 'png' || doc.ext === 'jpg' || doc.ext === 'jpeg' || doc.ext === 'gif') {      
                            return 1
                          }
                        }).length
                      } 
                    </Text>
                  </View>
                  <Feather name={'more-vertical'} color={COLORS.white} size={25}/>
                </View>
              )
            }
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
              <View style={{flexDirection: 'row', justifyContent: 'space-around', width: screenWidth, paddingLeft: 15, paddingRight: 15, paddingBottom: 10}}>
                <TouchableOpacity>
                  <Feather name={'plus'} color={COLORS.white} size={25}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialCommunityIcons name={'share-outline'} size={25} color={COLORS.white}/>
                </TouchableOpacity>
              </View>)
            }
          }
          index={openImageIndex.current}
        />
      </Modal>
      <View>
      {
        postDocs.map(doc => {
          const key = uuid.v4()
          let name = doc.title
          name = name.slice(0, 35)
          if (name !== doc.title) {
            name += '...' 
          }
          let size = doc.size
          let quantities = ['B', 'KB', 'MB', 'GB']
          let quantity = 'B'
          for (let i =0; i < 3; i++) {
            if (size >= 1000) {
              size = Math.round(size / 10) / 100
              quantity = quantities[i + 1]
            }  
          }
          if (doc.ext === 'png' || doc.ext === 'jpg' || doc.ext === 'jpeg' || doc.ext === 'gif') {
            // console.log(doc.preview.photo.sizes[0])
            doc.preview.photo.sizes.sort(function(a, b){return b.width - a.width})
            return (
              <TouchableOpacity style={{width: '100%', aspectRatio: 1.5}} onPress={() => setModalVisible(!modalVisible)}>
                <Image style={{width: '100%', height: '100%'}} source={{uri: doc.preview.photo.sizes[0].src}}/>
                <Text style={{fontSize: 12, textTransform: 'uppercase', position: 'absolute', left: '75%', top: '85%', backgroundColor: COLORS.black, borderRadius: 5, padding: 3, color: COLORS.white, opacity: 0.7}}>
                  {doc.ext} {size}{quantity}
                </Text>
              </TouchableOpacity>
            ) 
          }
          return (
            <PostFile
              key={doc.access_key} 
              isLightTheme={isLightTheme} 
              postDoc={doc} 
              size={size} 
              name={name} 
              quantity={quantity}
              id={key}
            />
          )  
        })
      }
      </View>
    </>
  )
}

export default PostFiles

const styles = StyleSheet.create({
  fileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
    // backgroundColor: COLORS.light_smoke
  },
  fileInfoContainer: {
    display: 'flex',
    width: '85%',
    flexDirection: 'column',
    marginLeft: 10,
    // backgroundColor: COLORS.secondary

  },
  nameLight: {
    fontSize: 14,
    color: COLORS.black,
    // fontWeight: '700',
  },
  nameDark: {
    fontSize: 14,
    color: COLORS.primary_text,
  },
  additionalInfoLight: {
    fontSize: 13,
    color: COLORS.black
  },
  additionalInfoDark: {
    fontSize: 13,
    color: COLORS.primary_text
  },
  fileIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light_smoke,
    borderRadius: 40
  }
})