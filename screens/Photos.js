import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from 'react-redux'
import uuid from 'react-native-uuid';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomHeader from '../components/CustomHeader'
import DividerWithLine from '../components/DividerWithLine'
import PhotosGridChunk from '../components/PhotosGridChunk'
import SearchResultHeaderCounter from '../components/SearchResultHeaderCounter';
import Carousel from '../components/Carousel';
import { COLORS } from '../constants/theme'

const Photos = ({ navigation, route }) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const [photosList, setPhotosList] = useState([])
  const [albumsList, setAlbumsList] = useState([])
  const count = 39
  const offset = useRef(0)
  const remainToFetchNum = useRef(null)
  const canRequestMore = useRef(true)
  const numOfPhotos = useRef(0)
  const numOfAlbums = useRef(0)
  const { ownerId } = route.params
  
  const fetchPhotos = async () => {
    const fetchPhotosUrl = `https://api.vk.com/method/photos.getAll?access_token=${accessToken}&v=5.131&count=${count}&offset=${offset.current}&owner_id=${ownerId}&extended=1`
    const response = await fetch(fetchPhotosUrl)
    const data = await response.json()
    if (remainToFetchNum.current === null) {
      numOfPhotos.current = data.response.count
      remainToFetchNum.current = data.response.count - count
      const fetchAlbumsUrl = `https://api.vk.com/method/photos.getAlbums?access_token=${accessToken}&v=5.131&count=${count}&offset=${offset.current}&owner_id=${ownerId}&need_covers=1&photo_sizes=1`
      const albumsRes= await fetch(fetchAlbumsUrl)
      const albums = await albumsRes.json()
      numOfAlbums.current = albums.response.count
      setAlbumsList(albums.response.items)
    } else {
      remainToFetchNum.current -= count 
    }
    offset.current += count
    setPhotosList(prevState => [...prevState, {data: data.response.items}])
  }

  useEffect(() => {
    fetchPhotos()
  }, [])


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
        <Carousel 
          data={albumsList}
          dataLength={numOfAlbums.current}
          type={'photos'}
          isLightTheme={isLightTheme}
        />
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

  const renderItem = ({item}) => {
    // console.log(item)
    return (
      <PhotosGridChunk
        photos={item}
      />
    )
  }

  const keyExtractor = () => {
    return uuid.v4()
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
        headerName={<Text style={styles.headerTextStyle}>Photos</Text>}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
      />
      <FlatList
        style={styles.list} 
        data={photosList}
        renderItem={renderItem}
        ListFooterComponent={footer}
        ListHeaderComponent={listHeader}
        showsVerticalScrollIndicator={false}
        // onEndReached={fetchMoreVideos}
        ListEmptyComponent={
          <View style={[styles.spinnerContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
            <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
          </View>
        }
        keyExtractor={keyExtractor}
        onEndReached={fetchPhotos}
      />  
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
    borderRadius: 5
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    height: '100%'
  },
})