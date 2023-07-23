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
  const { playerUrl, title, views, ownerId, likes, reposts, isLiked, isReposted, date, canLike, canAdd, canAddToFavs, commentsCount, canComment } = route.params
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  // console.log(accessToken)
  const video = useRef(null)
  const [videoUrl, setVideoUrl] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [isFriend, setIsFriend] = useState(0)
  const [isMember, setIsMember] = useState(0)
  const [likesCount, setLikesCount] = useState(likes)
  const [liked, setLiked] = useState(isLiked === 1 ? true : false)

  const webViewJsScript = `
  const meta = document.createElement('meta'); 
  meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); 
  meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
  `
  const fetchAuthroInfo = async () => {
    if (ownerId > 0) {
      const url = `https://api.vk.com/method/users.get?access_token=${accessToken}&v=5.131&fields=photo_100,is_friend&user_ids=${ownerId}`
      const response = await fetch(url)
      const data = await response.json()
    //   console.log(data)
      setName(`${data.response[0].first_name} ${data.response[0].last_name}`)
      setImgUrl(data.response[0].photo_100)
      setIsFriend(data.response[0].is_friend)
      setIsLoading(false)
    } else {
      const url = `https://api.vk.com/method/groups.getById?access_token=${accessToken}&v=5.131&fields=photo_100&group_id=${-1 * ownerId}`
      const response = await fetch(url)
      const data = await response.json()
    //   console.log(data)
      setName(data.response[0].name)
      setImgUrl(data.response[0].photo_100)
      setIsFriend(data.response[0].is_member)
      setIsLoading(false)
    }
  }

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

  const likePressHandler = (isPressed) => {
    if (isPressed) {
      setLikesCount(prevState => prevState - 1)
      setLiked(false)
    } else {
      setLikesCount(prevState => prevState + 1)
      setLiked(true)
    }
  }
  useEffect(() => {
    fetchAuthroInfo()
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
      <View style={[styles.contentContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
        {
          isLoading ? 
          <View style={{width: '100%', height: '100%', justifyContent: 'center'}}>
            <ActivityIndicator size={50} color={isLightTheme ? COLORS.primary : COLORS.white}/>
          </View> :
          <>
            <VideoHeader 
              ownerId={ownerId}
              date={date}
              accessToken={accessToken}
              isLightTheme={isLightTheme}
              navigation={navigation}
              name={name}
              imgUrl={imgUrl}
              isFriend={isFriend}
              isMember={isMember}
            />
            <WebView
              source={{uri: playerUrl}}
              allowsFullscreenVideo={true}
              startInLoadingState={true}
              renderLoading={() => {
                  return (
                    <View 
                      style={[
                        {width: '100%', height: '100%', justifyContent: 'center'}, 
                        isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}
                      ]}
                    >
                      <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
                    </View>
                  )
                }
              }
              scalesPageToFit={true}
              injectedJavaScript={webViewJsScript}
            />
            <View style={{marginLeft: 5}}>
              <Text style={[styles.title, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>
                {title}
              </Text>
              <Text style={styles.views}>
                {getShortagedNumber(views)} views
              </Text>
              <DividerWithLine 
                linePosition={'center'} 
                dividerLineWidth={'97%'} 
                dividerLineHeight={1} 
                dividerLineColor={isLightTheme ? COLORS.light_smoke : COLORS.secondary} 
                dividerHeight={20}
              />
              <VideoScreenBottom 
                canComment={canComment} 
                comments={commentsCount} 
                likes={likesCount} 
                isLiked={liked} 
                reposts={reposts} 
                likePressHandler={likePressHandler}
              />
              <DividerWithLine dividerHeight={10} dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}/>
            </View>
          </>
        }
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
    flex: 0.75, 
    marginLeft: 5, 
    marginRight: 5, 
    marginTop: 10,
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