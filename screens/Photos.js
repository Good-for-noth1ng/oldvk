import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator, Image, Modal, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
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
import SearchResultHeaderCounter from '../components/SearchResultHeaderCounter';
import Carousel from '../components/Carousel';
import PhotoGridItem from '../components/PhotoGridItem';
import { COLORS } from '../constants/theme'
import { FlashList } from "@shopify/flash-list";
import ImageViewer from 'react-native-image-zoom-viewer';

const screenWidth = Dimensions.get('window').width
const Photos = ({ navigation, route }) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const currentUserId = useSelector(state => state.user.userId)
  const [isLoading, setIsLoading] = useState(true)
  const [photosList, setPhotosList] = useState([])
  const [albumsList, setAlbumsList] = useState([])
  const count = 24
  const offset = useRef(0)
  const remainToFetchNum = useRef(null)
  const numOfPhotos = useRef(0)
  const numOfAlbums = useRef(0)
  const ownerId = route.params === undefined ? currentUserId : route.params.ownerId
  const [modalVisible, setModalVisible] = React.useState(false)
  const imagesForSlides = React.useRef([])
  const indexForOpening = React.useRef(0)
  const indexOfPhoto = React.useRef(-1)
  // console.log('rerender')
  const fetchPhotos = async () => {
    const fetchPhotosUrl = `https://api.vk.com/method/photos.getAll?access_token=${accessToken}&v=5.131&count=${count}&offset=${offset.current}&owner_id=${ownerId}&extended=1`
    const response = await fetch(fetchPhotosUrl)
    const data = await response.json()
    if (remainToFetchNum.current === null) {
      numOfPhotos.current = data.response.count
      remainToFetchNum.current = data.response.count - count
      let fetchAlbumsCountUrl
      if (ownerId < 0) {
        fetchAlbumsCountUrl = `https://api.vk.com/method/photos.getAlbumsCount?access_token=${accessToken}&v=5.131&group_id=${-1 * ownerId}`
      } else {
        fetchAlbumsCountUrl = `https://api.vk.com/method/photos.getAlbumsCount?access_token=${accessToken}&v=5.131&user_id=${ownerId}`
      }
      const fetchAlbumsUrl = `https://api.vk.com/method/photos.getAlbums?access_token=${accessToken}&v=5.131&count=${count}&offset=${offset.current}&owner_id=${ownerId}&need_covers=1&photo_sizes=1`
      const albumsRes= await fetch(fetchAlbumsUrl)
      const albumsCountRes = await fetch(fetchAlbumsCountUrl)
      const albums = await albumsRes.json()
      const albumsCount = await albumsCountRes.json()
      numOfAlbums.current = albumsCount.response
      offset.current += count
      setAlbumsList(albums.response.items)
    } else {
      offset.current += count
      remainToFetchNum.current -= count 
    }
    let photos = data.response.items.map(item => {
      const key = uuid.v4()
      let ph
      for (let i = 0; i < item.sizes.length; i++) {
        if (item.sizes[i].type === 'x') {
          ph = {url: item.sizes[i].url}
          break
        }
      }
      if (ph) {
        imagesForSlides.current.push(ph)
      } else {
        imagesForSlides.current.push({uri: item.sizes[item.sizes.length - 1].url})
      }
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

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchMore = ( ) => {
    // console.log('fetch more')
    if (remainToFetchNum.current > 0) {
      fetchPhotos()
    }
  }

  const openDrawer = () => {
    navigation.openDrawer()
  }

  const goBack = () => {
    navigation.goBack()
  }

  const listHeader = () => {
    return (
      <>
        <DividerWithLine 
          dividerHeight={10} 
          marginT={10} 
          borderTL={5} 
          borderTR={5} 
          dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
        />
        {
          numOfAlbums.current > 0 ?
          <Carousel 
            data={albumsList}
            dataLength={numOfAlbums.current}
            dataLengthFetched={count}
            type={'photos'}
            isLightTheme={isLightTheme}
            navigation={navigation}
            ownerId={ownerId}
          /> : null
        }
        <SearchResultHeaderCounter 
          isLightTheme={isLightTheme}
          counterName={'All photos'}
          counterNum={numOfPhotos.current}
        />
        <DividerWithLine 
          dividerHeight={10}  
          dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
        />
      </>  
    )
  }

  const openImage = () => {
    setModalVisible(prev => !prev)
  }

  const renderItem = ({item}) => {
    return (
      <PhotoGridItem item={item} isLightTheme={isLightTheme} id={item.key} openImage={openImage} indexForOpening={indexForOpening}/>     
    )
  }

  const keyExtractor = (item) => {
    return item.key
  }

  const footer = () => {
    if (remainToFetchNum.current > 0) {
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
        headerName={<Text style={styles.headerTextStyle}>Photos</Text>}
        iconComponent={
          currentUserId === ownerId ?
          <Entypo name='menu' color={COLORS.white} size={30}/> :
          <AntDesign name='arrowleft' size={30} color={COLORS.white}/>
        }
        iconTouchHandler={currentUserId === ownerId ? openDrawer : goBack}
        isScreenFromDrawerMenu={ownerId === currentUserId}
        navigation={navigation}
      />
      {
        isLoading ?
        <View style={[styles.spinnerContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
          <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
        </View> :
        // <View style={{width: '100%', height: '100%', paddingLeft: 5, paddingRight: 5, flex: 1}}>
        //   <FlashList 
        //     data={photosList}
        //     renderItem={renderItem}
        //     ListFooterComponent={footer}
        //     ListHeaderComponent={listHeader}
        //     showsVerticalScrollIndicator={false}
        //     numColumns={3}
        //     keyExtractor={keyExtractor}
        //     onEndReached={fetchMore}
        //     estimatedItemSize={140}
        //   />
        // </View>
        <>
          <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible);}}
          >
            <ImageViewer 
              imageUrls={imagesForSlides.current}
              enableImageZoom={true}
              useNativeDriver={true}
              enablePreload={true}
              enableSwipeDown={true}
              renderIndicator={(currentIndex) => <></>}
              renderHeader={
              (currentIndex) => (
                <View style={{
                  position: 'absolute', 
                  zIndex: 3, 
                  flexDirection: 'row', 
                  width: screenWidth, 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  paddingLeft: 10, 
                  paddingRight: 10, 
                  marginTop: 10
                }}>
                  <View style={{flexDirection: 'row', gap: 30}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => setModalVisible(false)}>
                      <AntDesign name={'arrowleft'} size={25} color={COLORS.white}/>
                    </TouchableOpacity>
                    <Text style={{color: COLORS.white, fontSize: 17}}>{currentIndex + 1} of {numOfPhotos.current}</Text>
                  </View>
                    <Feather name={'more-vertical'} color={COLORS.white} size={25}/>
                </View>
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
          index={indexForOpening.current}
        />
          </Modal>
          <FlatList
            style={[styles.list, ]} 
            data={photosList}
            renderItem={renderItem}
            ListFooterComponent={footer}
            ListHeaderComponent={listHeader}
            showsVerticalScrollIndicator={false}
            numColumns={3}
          // ListEmptyComponent={
          //   <View style={[styles.spinnerContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
          //     <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
          //   </View>
            // }
            keyExtractor={keyExtractor}
            onEndReached={fetchMore}
          />
        </>
      }
        
    </SafeAreaView>
  )
}

export default Photos

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
    height: '100%'
  },
})