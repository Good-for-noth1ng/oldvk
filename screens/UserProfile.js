import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomHeader from '../components/CustomHeader'
import WallHeader from '../components/WallHeader'
import { COLORS } from '../constants/theme'

const UserProfile = () => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const userId = useSelector(state => state.userWall.id)
  console.log(userId)
  const [isLoading, setIsLoading] = useState(true) 
  const userInfoUrl = `https://api.vk.com/method/users.get?access_token=${accessToken}&v=5.131&user_ids=${userId}&fields=friend_status,followers_count,photo_200,online,last_seen,counters,status`
  const [wallHeaderData , setWallHeaderData] = useState({})

  const fetchData = async () => {
    const userInfoResponse = await fetch(userInfoUrl)
    const userInfoData = await userInfoResponse.json()
    let isOnlineUsingMobile
    let isOnlineUsingPC
    if (userInfoData.response[0].online && (userInfoData.response[0].online_app || userInfoData.response[0].online_mobile)) {
      isOnlineUsingMobile = true
      isOnlineUsingPC = false
    } else {
      isOnlineUsingMobile = false
      isOnlineUsingPC = true
    }
    setWallHeaderData({
      userName: `${userInfoData.response[0].first_name} ${userInfoData.response[0].last_name}`,
      isClosed: userInfoData.response[0].is_closed,
      isOnlineUsingMobile: isOnlineUsingMobile,
      isOnlineUsingPC: isOnlineUsingPC,
      friendStatus: userInfoData.response[0].friend_status,
      avatarUrl: userInfoData.response[0].photo_200,
      status: userInfoData.response[0].status,
      counters: userInfoData.response[0].counters,
      lastSeen: userInfoData.response[0].last_seen,
    })
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const listHeader = () => (
    <WallHeader
      name={wallHeaderData.userName} 
      avatarUrl={wallHeaderData.avatarUrl}
      status={wallHeaderData.status}
      counters={wallHeaderData.counters}
      lastSeen={wallHeaderData.lastSeen}
      isOnlineUsingMobile={wallHeaderData.isOnlineUsingMobile}
      isOnlineUsingPC={wallHeaderData.isOnlineUsingPC}
    />
  )

  return (
    <SafeAreaView style={isLightTheme ? styles.mainContainerLight : styles.mainContainerDark}>
      <StatusBar backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} barStyle={COLORS.white}/>
      <CustomHeader 
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        isLightTheme={isLightTheme}
        headerName={<Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Profile</Text>}
      />
      {
        isLoading ?
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={50} color={isLightTheme ? COLORS.primary : COLORS.white}/>
        </View> : 
        <FlatList
          style={styles.list}
          ListHeaderComponent={listHeader}
        />
      }
    </SafeAreaView>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  mainContainerLight: {
    flex: 1,
    backgroundColor: COLORS.light_smoke
  },
  mainContainerDark: {
    flex: 1,
    backgroundColor: COLORS.background_dark
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    marginLeft: 5,
    marginRight: 5
  }
})