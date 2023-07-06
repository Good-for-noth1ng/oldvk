import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { WebView } from 'react-native-webview'
import { useSelector } from 'react-redux'
import CustomHeader from '../components/CustomHeader'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DividerWithLine from '../components/DividerWithLine'
import { Video, ResizeMode } from 'expo-av';
import { COLORS } from '../constants/theme'


const VideoScreen = ({navigation, route}) => {
  const { playerUrl } = route.params
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)

  const getVideoUrl = async () => {
    const response = await fetch(playerUrl)
    const htmlPage = await response.text()
    const regex = /\"url720\":.*\"https.*\"\,/g
    const result = htmlPage.match(regex)[0]
    console.log(result)
  }

  useEffect(() => {
    getVideoUrl()
    // fetch(playerUrl).then(res => res.text()).then(data => console.log(data.split(' ')[0]))
  }, [])

  const goBack = () => {
    navigation.goBack()
  }
  return (
    <SafeAreaView style={[{flex: 1, justifyContent: 'flex-start'}, isLightTheme ? {backgroundColor: COLORS.light_smoke} : {backgroundColor: COLORS.background_dark}]}>
      <StatusBar barStyle={COLORS.white} backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} />
      <CustomHeader 
        isLightTheme={isLightTheme}
        headerName={<Text style={styles.headerTextStyle}>Video</Text>}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
      />
      {/* <DividerWithLine 
        dividerHeight={10} 
        dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark} 
        marginL={5} 
        marginR={5} 
        marginT={5} 
        borderTL={5} 
        borderTR={5}
      /> */}
      {/* <WebView
        source={{uri: playerUrl}}
        style={{maxHeight: 320, marginLeft: 5, marginRight: 5}}
        allowsFullscreenVideo={true}
        renderLoading={
          <View style={[styles.spinnerContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
            <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
          </View>
        }
      /> */}
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
})