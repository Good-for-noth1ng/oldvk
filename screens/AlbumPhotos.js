import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native'
import React from 'react'
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

const AlbumPhotos = ({ navigation, route }) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const [photosList, setPhotosList] = React.useState([])
  const count = 24
  const offset = React.useRef(0)
  const remainToFetchNum = React.useRef(null)
  const canRequestMore = React.useRef(true)
  const numOfPhotos = React.useRef(0)
  const { albumId, headerName, ownerId } = route.params

  const fetchAlbumPhotos = async () => {
    const fetchAlbumPhotosUrl = `https://api.vk.com/method/photos.get?access_token=${accessToken}&v=5.131&count=${count}&album_id=${albumId}&offset=${offset.current}&owner_id=${ownerId}&extended=1`
    const response = await fetch(fetchAlbumPhotosUrl)
    const data = await response.json()
    if (remainToFetchNum.current === null) {
      numOfPhotos.current = data.response.count
      remainToFetchNum.current = data.response.count - count
    } else {
      remainToFetchNum.current -= count 
    }
    offset.current += count
    setPhotosList(prevState => [...prevState, {data: data.response.items}])
  }

  React.useEffect(() => {
    fetchAlbumPhotos()
  }, [])

  const renderItem = ({item}) => {
    return (
      <PhotosGridChunk
        isLightTheme={isLightTheme}
        photos={item}
      />
    )
  }

  const keyExtractor = (item) => {
    return item.id
  }

  const goBack = () => {
    navigation.goBack()
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
        headerName={<Text style={styles.headerTextStyle}>{headerName}</Text>}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
      />
      <FlatList
        style={styles.list} 
        data={photosList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={footer}
        ListEmptyComponent={
          <View style={[styles.spinnerContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
            <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
          </View>
        }   
        onEndReached={fetchAlbumPhotos}
        ListHeaderComponent={listHeader}
      />
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
    height: '100%'
  },
})