import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native'
import React from 'react'
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from 'react-redux'
import uuid from 'react-native-uuid';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomHeader from '../components/CustomHeader'
import DividerWithLine from '../components/DividerWithLine'
import PhotosGridChunk from '../components/PhotosGridChunk'
import PhotoGridItem from '../components/PhotoGridItem';
import SearchResultHeaderCounter from '../components/SearchResultHeaderCounter';
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
  console.log(albumId)
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
    const photos = data.response.items.map((item) => {
      const key = uuid.v4()
      // if (item === undefined) {
      //   console.log('undef')
      // }
      return {...item, key: key}
    })

    setPhotosList(prevState => prevState.concat(photos))
  }

  React.useEffect(() => {
    fetchAlbumPhotos()
  }, [])

  const renderItem = ({item}) => {
    return (
      <PhotoGridItem
        item={item}
        isLightTheme={isLightTheme}
      />
    )
  }

  const keyExtractor = (item) => {
    return item.key
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
        headerName={<Text style={styles.headerTextStyle}>{headerTitle}</Text>}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
      />
      <FlatList
        data={photosList} 
        renderItem={renderItem}
        style={styles.list}
        keyExtractor={keyExtractor}
        ListFooterComponent={footer}
        ListEmptyComponent={
          <View style={[styles.spinnerContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
            <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
          </View>
        }   
        onEndReached={fetchAlbumPhotos}
        ListHeaderComponent={listHeader}
        numColumns={3}
        showsVerticalScrollIndicator={false}
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