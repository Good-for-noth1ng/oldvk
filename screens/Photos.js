import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator, Image } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from 'react-redux'
import uuid from 'react-native-uuid';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomHeader from '../components/CustomHeader'
import DividerWithLine from '../components/DividerWithLine'
import SearchResultHeaderCounter from '../components/SearchResultHeaderCounter';
import Carousel from '../components/Carousel';
import PhotoGridItem from '../components/PhotoGridItem';
import { COLORS } from '../constants/theme'

const Photos = ({ navigation, route }) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const [isLoading, setIsLoading] = useState(true)
  const [photosList, setPhotosList] = useState([])
  const [albumsList, setAlbumsList] = useState([])
  const count = 36
  const offset = useRef(0)
  const remainToFetchNum = useRef(null)
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
      offset.current += count
      setAlbumsList(albums.response.items)
    } else {
      offset.current += count
      remainToFetchNum.current -= count 
    }
    const photos = data.response.items.map(item => {
      const key = uuid.v4()
      return {...item, key: key}
    })
    setPhotosList(prevState => prevState.concat(photos))
    setIsLoading(false)
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchMore = ( ) => {
    // console.log('fetch more')
    fetchPhotos()
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

  const renderItem = ({item}) => {
    return (
      <PhotoGridItem item={item} isLightTheme={isLightTheme}/>     
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
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
      />
      {
        isLoading ?
        <View style={[styles.spinnerContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
          <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
        </View> :
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