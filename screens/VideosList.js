import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native'
import { FlatList } from "react-native-gesture-handler";
import React, { useEffect, useState, useRef } from 'react'
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import CustomHeader from '../components/CustomHeader'
import VideosListItem from '../components/VideosListItem'
import DividerWithLine from '../components/DividerWithLine'
import Carousel from '../components/Carousel';
import SearchResultHeaderCounter from '../components/SearchResultHeaderCounter';
import { COLORS } from '../constants/theme'
import { FlashList } from "@shopify/flash-list";

const VideosList = ({ navigation, route }) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const currentUserId = useSelector(state => state.user.userId)
  const [isLoading, setIsLoading] = useState(true)
  const [videosList, setVideosList] = useState([])
  const [albumsList, setAlbumsList] = useState([])
  const count = 10
  const offset = useRef(0)
  const remainToFetchNum = useRef(null)
  const numOfVideos = useRef(0)
  const numOfAlbums = useRef(0)
  const ownerId = route.params === undefined ? currentUserId : route.params.ownerId

  const fetchVideos = async () => {
    const fetchVideosUrl = `https://api.vk.com/method/video.get?access_token=${accessToken}&v=5.131&count=${count}&offset=${offset.current}&owner_id=${ownerId}&extended=1`
    const response = await fetch(fetchVideosUrl)
    const data = await response.json()
    if (remainToFetchNum.current === null) {
      numOfVideos.current = data.response.count
      remainToFetchNum.current = data.response.count - count
      const fetchVideoAlbumsUrl = `https://api.vk.com/method/video.getAlbums?access_token=${accessToken}&v=5.131&count=${count}&offset=${offset.current}&owner_id=${ownerId}&extended=1`
      const albumsRes = await fetch(fetchVideoAlbumsUrl)
      const albums = await albumsRes.json()
      // console.log(albums)
      numOfAlbums.current = albums.response.count
      offset.current += count
      setAlbumsList(albums.response.items)
    } else {
      offset.current += count 
      remainToFetchNum.current -= count 
    }
    
    const videos = data.response.items.map(item => {
      const key = uuid.v4()
      return {...item, key: key}
    })
    setVideosList(prevState => prevState.concat(videos))
    setIsLoading(false)
  }

  useEffect(() => {
    fetchVideos()
  }, [])
  
  const openDrawer = () => {
    navigation.openDrawer()
  }
  
  const goBack = () => {
    navigation.goBack()
  }

  const fetchMoreVideos = () => {
    if (remainToFetchNum.current > 0) {
      fetchVideos()
    }
  }

  const listSeparator = () => {
    return (
      <DividerWithLine dividerHeight={10} dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}/>
    )
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
            type={'videos'}
            isLightTheme={isLightTheme}
            navigation={navigation}
            ownerId={ownerId}
            dataLengthFetched={count}
          /> : null
        }
        <SearchResultHeaderCounter 
          isLightTheme={isLightTheme}
          counterName={'All videos'}
          counterNum={numOfVideos.current}
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
      <VideosListItem
        title={item.title}
        imageUrl={item.image[item.image.length - 1].url}
        duration={item.duration}
        views={item.views}
        date={item.date}
        isLightTheme={isLightTheme}
        navigation={navigation}
        playerUrl={item.player}
        ownerId={item.owner_id}
        likes={item.likes.count}
        reposts={item.reposts.count}
        isLiked={item.likes.user_likes}
        isReposted={item.reposts.user_reposted}
        id={item.key}
        canLike={item.can_like}
        canAdd={item.can_add}
        canAddToFavs={item.can_add_to_faves}
        commentsCount={item.comments}
        canComment={item.can_comment}
        videoId={item.id}
      />
    )
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

  const keyExtractor = (item) => {
    return item.key
  }

  return (
    <SafeAreaView style={[
        {flex: 1}, 
        isLightTheme ? {backgroundColor: COLORS.light_smoke} : {backgroundColor: COLORS.background_dark}
      ]}>
      <StatusBar barStyle={COLORS.white} backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} />
      <CustomHeader 
        isLightTheme={isLightTheme}
        headerName={<Text style={styles.headerTextStyle}>Videos</Text>}
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
        <View style={{width: '100%', height: '100%', paddingLeft: 5, paddingRight: 5, flex: 1}}>
        <FlashList
          data={videosList}
          renderItem={renderItem}
          estimatedItemSize={93}
          onEndReached={fetchMoreVideos}
          ListHeaderComponent={listHeader}
          ListFooterComponent={footer}
          ItemSeparatorComponent={listSeparator}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor} 
        />
        </View>
        // <FlatList
        //   style={styles.list} 
        //   data={videosList}
        //   renderItem={renderItem}
        //   ListFooterComponent={footer}
        //   ListHeaderComponent={listHeader}
        //   ItemSeparatorComponent={listSeparator}
        //   showsVerticalScrollIndicator={false}
        //   onEndReached={fetchMoreVideos}
        // ListEmptyComponent={
        //   <View style={[styles.spinnerContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
        //     <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
        //   </View>
        // }
        //   keyExtractor={keyExtractor}
        // />
      }
    </SafeAreaView>
  )
}

export default VideosList

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    height: '100%'
  },
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
})