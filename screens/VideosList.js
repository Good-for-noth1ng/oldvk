import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomHeader from '../components/CustomHeader'
import VideosListItem from '../components/VideosListItem'
import DividerWithLine from '../components/DividerWithLine'
import { COLORS } from '../constants/theme'

const VideosList = ({ navigation, route }) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const [isLoading, setIsLoading] = useState(true)
  const [videosList, setVideosList] = useState([])
  const count = 10
  const offset = useRef(0)
  const remainToFetchNum = useRef(null)
  const canRequestMore = useRef(true)
  const { ownerId } = route.params

  const fetchVideos = async () => {
    const fetchVideosUrl = `https://api.vk.com/method/video.get?access_token=${accessToken}&v=5.131&count=${count}&offset=${offset.current}&owner_id=${ownerId}&extended=1`
    const response = await fetch(fetchVideosUrl)
    const data = await response.json()
    // console.log(data)
    // if (data.response.items.length < count) {
    //   canRequestMore.current = false
    // }
    if (remainToFetchNum.current === null) {
      remainToFetchNum.current = data.response.count - count
    } else {
      remainToFetchNum.current -= count 
    }
    offset.current += count
    setVideosList(prevState => prevState.concat(data.response.items))
  }

  useEffect(() => {
    fetchVideos()
  }, [])
  
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
      <DividerWithLine 
        dividerHeight={10} 
        marginT={10} 
        borderTL={5} 
        borderTR={5} 
        dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
      />  
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

  const keyExtractor = (item) => {
    return item.id
  }
  return (
    <SafeAreaView style={[{flex: 1}, isLightTheme ? {backgroundColor: COLORS.light_smoke} : {backgroundColor: COLORS.background_dark}]}>
      <StatusBar barStyle={COLORS.white} backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} />
      <CustomHeader 
        isLightTheme={isLightTheme}
        headerName={<Text style={styles.headerTextStyle}>Videos</Text>}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
      />
      <FlatList
        style={styles.list} 
        data={videosList}
        renderItem={renderItem}
        ListFooterComponent={footer}
        ListHeaderComponent={listHeader}
        ItemSeparatorComponent={listSeparator}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchMoreVideos}
        ListEmptyComponent={
          <View style={[styles.spinnerContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
            <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
          </View>
        }
        keyExtractor={keyExtractor}
      />
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