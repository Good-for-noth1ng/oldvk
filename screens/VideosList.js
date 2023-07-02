import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native'
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
  const { ownerId } = route.params

  const fetchVideos = async () => {
    const fetchVideosUrl = `https://api.vk.com/method/video.get?access_token=${accessToken}&v=5.131&count=${count}&offset=${offset.current}&owner_id=${ownerId}&extended=1&fields=name,photo_100`
  }

  useEffect(() => {
    fetchVideos()
  }, [])
  
  const goBack = () => {
    navigation.goBack()
  }

  const listHeader = () => {

  }

  const renderItem = () => {

  }

  const footer = () => {

  }

  return (
    <SafeAreaView style={[{flex: 1}, isLightTheme ? {backgroundColor: COLORS.light_smoke} : {backgroundColor: COLORS.background_dark}]}>
      <StatusBar barStyle={COLORS.white} backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} />
      <CustomHeader 
        isLightTheme={isLightTheme}
        headerName={<Text style={styles.headerTextStyle}>Followers</Text>}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
      />
      <FlatList
        style={styles.list} 
        data={usersList}
        renderItem={renderItem}
        ListFooterComponent={footer}
        ListHeaderComponent={listHeader}
        ItemSeparatorComponent={listSeparator}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchMoreFollowers}
        ListEmptyComponent={
          <View style={[styles.spinnerContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
            <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
          </View>
        }
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