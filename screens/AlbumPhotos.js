import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator, Image, Modal, Dimensions, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from 'react-redux'
import uuid from 'react-native-uuid';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisio from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import CustomHeader from '../components/CustomHeader'
import DividerWithLine from '../components/DividerWithLine'
import PhotosGridChunk from '../components/PhotosGridChunk'
import PhotoGridItem from '../components/PhotoGridItem';
import SearchResultHeaderCounter from '../components/SearchResultHeaderCounter';
import { COLORS } from '../constants/theme'
import ImageViewer from 'react-native-image-zoom-viewer';

const screenWidth = Dimensions.get('window').width
const AlbumPhotos = ({ navigation, route }) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const [photosList, setPhotosList] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const count = 24
  const offset = React.useRef(0)
  const remainToFetchNum = React.useRef(null)
  const canRequestMore = React.useRef(true)
  const numOfPhotos = React.useRef(0)
  const { albumId, headerName, ownerId, author } = route.params
  const [modalVisible, setModalVisible] = React.useState(false)
  const imagesForSlides = React.useRef([])
  const indexForOpening = React.useRef(0)
  const indexOfPhoto = React.useRef(-1)

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

  let headerTitle = headerName.slice(0, 24)
  if (headerTitle !== headerName) {
    headerTitle += '...'
  }

  const fetchAlbumPhotos = async () => {
    const fetchAlbumPhotosUrl = `https://api.vk.com/method/photos.get?access_token=${accessToken}&v=5.131&count=${count}&album_id=${albumId}&offset=${offset.current}&owner_id=${ownerId}&extended=1&photo_sizes=1`
    const response = await fetch(fetchAlbumPhotosUrl)
    const data = await response.json()
    if (remainToFetchNum.current === null) {
      numOfPhotos.current = data.response.count
      remainToFetchNum.current = data.response.count - count
    } else {
      remainToFetchNum.current -= count 
    }
    offset.current += count
    let photos = data.response.items.map((item) => {
      const key = uuid.v4()
      item.sizes.sort(function(a, b){return b.width - a.width})
      imagesForSlides.current.push({url: item.sizes[0].url})
      indexOfPhoto.current += 1
      return {...item, key: key, indexOfPhoto: indexOfPhoto.current}
    })
    const emptyElemsNum = data.response.items.length % 3
    for (let i = 0; i < emptyElemsNum; i++) {
      const key = uuid.v4()
      photos.push({key: key})
    }
    setPhotosList(prevState => prevState.concat(photos))
    setIsLoading(false)
  }

  const fetchMore = () => {
    if (remainToFetchNum.current > 0) {
      fetchAlbumPhotos()
    }
  }

  React.useEffect(() => {
    fetchAlbumPhotos()
  }, [])

  const renderItem = ({item}) => {
    return (
      <PhotoGridItem
        item={item}
        isLightTheme={isLightTheme}
        id={item.id}
        openImage={openImage}
        indexForOpening={indexForOpening}
      />
    )
  }

  const keyExtractor = (item) => {
    return item.key
  }

  const goBack = () => {
    navigation.goBack()
  }

  const openImage = () => {
    setModalVisible(prev => !prev)
  }

  const listHeader = () => {
    return (
      <DividerWithLine 
        dividerHeight={10} 
        marginT={10} 
        borderTL={5} 
        borderTR={5} 
        dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
      />
    )
  }
  const footer = () => {
    if (remainToFetchNum.current > 0 && canRequestMore.current) {
      return (
        <>
          <View style={[{justifyContent: 'center'}, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
            <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={40}/>
          </View>
          <DividerWithLine 
            dividerHeight={5} 
            marginB={10} 
            borderBL={5} 
            borderBR={5} 
            dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
          />
        </>
      )
    }
    return (
      <DividerWithLine 
        dividerHeight={10} 
        marginB={10} 
        borderBL={5} 
        borderBR={5} 
        dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
      />
    )
  }

  return (
    <SafeAreaView style={[{flex: 1}, isLightTheme ? {backgroundColor: COLORS.light_smoke} : {backgroundColor: COLORS.background_dark}]}>
      <StatusBar barStyle={COLORS.white} backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} />
      <CustomHeader 
        isLightTheme={isLightTheme}
        headerName={<Text style={styles.headerTextStyle}>{headerTitle}</Text>}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
      />
      {
        isLoading ?
        <View style={[styles.spinnerContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
          <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
        </View> :
        <>
          <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={
              () => {
                shouldHideTopAndBottom.current = false
                setModalVisible(false)
              }
            }
          >
            <ImageViewer 
              imageUrls={imagesForSlides.current}
              enableImageZoom={true}
              useNativeDriver={true}
              enablePreload={true}
              enableSwipeDown={false}
              renderIndicator={(currentIndex) => <></>}
              onClick={performHidePhotoInfoAnim}
              renderHeader={
                (currentIndex) => (
                  <Animated.View style={{
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
                  }}>
                    <View style={{flexDirection: 'row', gap: 30}}>
                      <TouchableOpacity activeOpacity={0.5} onPress={() => setModalVisible(false)}>
                        <AntDesign name={'arrowleft'} size={25} color={COLORS.white}/>
                      </TouchableOpacity>
                      <Text style={{color: COLORS.white, fontSize: 17}}>{currentIndex + 1} of {numOfPhotos.current}</Text>
                    </View>
                      <Feather name={'more-vertical'} color={COLORS.white} size={25}/>
                  </Animated.View>
                )
              }
              renderImage={
                (props) => {
                  // fetchMore()
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
                          () => navigation.push('OpenedPhoto', {
                            photoUrl: photosList[index].sizes[0].url,
                            photoId: photosList[index].id,
                            text: photosList[index].text,
                            ownerId: photosList[index].owner_id,
                            date: photosList[index].date,
                            author: author,
                            albumId: photosList[index].album_id,
                            width: photosList[index].sizes[0].width,
                            height: photosList[index].sizes[0].height
                          })
                        }
                      >
                        <MaterialCommunityIcons name={'comment-outline'} color={COLORS.white} size={20} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <MaterialCommunityIcons name={'share-outline'} size={20} color={COLORS.white}/>
                      </TouchableOpacity>
                    </Animated.View>
                    )
                  } 
                }
                index={indexForOpening.current}
              />
          </Modal>
          <FlatList
            data={photosList} 
            renderItem={renderItem}
            style={styles.list}
            keyExtractor={keyExtractor}
            ListFooterComponent={footer}  
            onEndReached={fetchMore}
            ListHeaderComponent={listHeader}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        </>
      }
    </SafeAreaView>
  )
}

export default AlbumPhotos

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  list: {
    marginLeft: 5,
    marginRight: 5,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5
  },
})