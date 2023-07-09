import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview'
import { useSelector } from 'react-redux'
import CustomHeader from '../components/CustomHeader'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DividerWithLine from '../components/DividerWithLine'
import { Video, ResizeMode } from 'expo-av';
import { COLORS } from '../constants/theme'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import { getShortagedNumber } from '../utils/numShortage'
import VideoScreenBottom from '../components/VideoScreenBottom'
import VideoHeader from '../components/VideoHeader'

const VideoScreen = ({navigation, route}) => {
  const { playerUrl, title, views, ownerId, likes, reposts, isLiked, isReposted, date } = route.params
  // console.log(playerUrl)
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const video = useRef(null)
  const [videoUrl, setVideoUrl] = useState(undefined)
  

  const getVideoUrl = async () => {
    const response = await fetch(playerUrl)
    const htmlPage = await response.text()
    const regex = /"url240":"https:.[^,]*|"url360":"https:.[^,]*|"url480":"https:.[^,]*|"url720":"https:.[^,]*/g
    const urls = htmlPage.match(regex)
    // console.log('\n')
    // const res = await fetch(urls[3].split('":"')[1].slice(0, -1))
    // console.log(res.status, res.statusTexts, res.type, res.headers)
    // video.current.loadAsync(urls[3].split('":"')[1].slice(0, -1))
    // setVideoUrl(urls[3].split('":"')[1].slice(0, -1))
    // const customHtml = `<body><h1>LALALALALA</h1></body>`
    
    // const customHtml = `
    // <html>
    //   <body>
    //     <video controls width="800" height="800">
    //       <source src="${urls[3].split('":"')[1].slice(0, -1)}" type="video/mp4">
    //     </video>
    //   </body>
    // <html>
    // `
    // console.log(urls[3].split('":"')[1].slice(0, -1))
    setVideoUrl(customHtml)
    // await video.current.loadAsync({uri: urls[3].split('":"')[1].slice(0, -1).concat('3953674881735.mp4')})
    // return urls[3].split('":"')[1].slice(0, -1)
  }

  useEffect(() => {
    // getVideoUrl()
    // setVideoUrl(url)
    // console.log(url)
    // fetch(url).then(res => res.text()).then(data => console.log(data))
  }, [])

  const goBack = () => {
    navigation.goBack()
  }
  return (
    <SafeAreaView style={[{flex: 1, justifyContent: 'flex-start' }, isLightTheme ? {backgroundColor: COLORS.light_smoke} : {backgroundColor: COLORS.background_dark}]}>
      <StatusBar barStyle={COLORS.white} backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} />
      <CustomHeader 
        isLightTheme={isLightTheme}
        headerName={<Text style={styles.headerTextStyle}>Video</Text>}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
      />
       {/* <WebView
        source={{html: videoUrl}}
        style={{maxHeight: 320, marginLeft: 5, marginRight: 5}}
        allowsFullscreenVideo={true}
        renderLoading={
          <View style={[styles.spinnerContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
            <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
          </View>
        }
        onError={(error) => console.log(error.type)}
        onHttpError={error => console.log(error.type)}
      /> */}
            
      {/* <DividerWithLine 
        dividerHeight={10} 
        dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark} 
        marginL={5} 
        marginR={5} 
        marginT={5} 
        borderTL={5} 
        borderTR={5}
      /> */}
      <View style={[styles.contentContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
        <VideoHeader 
          ownerId={ownerId}
          date={date}
          accessToken={accessToken}
          isLightTheme={isLightTheme}
        />
        <WebView
          source={{uri: playerUrl}}
          style={[{maxHeight: 300}]}
          allowsFullscreenVideo={true}
          renderLoading={() => (
            <View style={[styles.spinnerContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
              <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
            </View>
            )
          }
          scalesPageToFit={true}
          
        />
        <View style={{marginLeft: 5}}>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.views}>
            {getShortagedNumber(views)} views
          </Text>
          <DividerWithLine 
            linePosition={'center'} 
            dividerLineWidth={'97%'} 
            dividerLineHeight={1} 
            dividerLineColor={COLORS.light_smoke} 
            dividerHeight={20}
          />
          <VideoScreenBottom likes={likes} reposts={reposts}/>
          <DividerWithLine dividerHeight={10} dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}/>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default VideoScreen

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  spinnerContainer: {
    // flex: 1,
    justifyContent: 'center',
    // height: '100%'
  },
  contentContainer: {
    flex: 0.8, 
    marginLeft: 5, 
    marginRight: 5, 
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  views: {
    fontSize: 15,
    color: COLORS.secondary
  }
})