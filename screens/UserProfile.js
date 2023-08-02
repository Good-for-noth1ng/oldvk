import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import CustomHeader from '../components/CustomHeader'
import WallHeaderGeneralInfo from '../components/WallHeaderGeneralInfo';
import WallHeaderCountersGrid from '../components/WallHeaderCountersGrid';
import WallHeaderButtons from '../components/WallHeaderButtons';
import DividerWithLine from '../components/DividerWithLine'
import Post from '../components/Post';
import Repost from '../components/Repost';
import WallIsPrivateText from '../components/WallIsPrivateText';
import WallHeaderPostSuggestButton from '../components/WallHeaderPostSuggestButton';
import WallHeaderPersonalContainer from '../components/WallHeaderPersonalContainer';
// import { setData, pushData, clear } from '../redux/userWallSlice'
import { COLORS } from '../constants/theme'
import ProfileHeaderName from '../components/ProfileHeaderName';
import { findPostAuthor } from '../utils/dataPreparationForComponents';
// fix redux calls
const UserProfile = ({navigation, route}) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const [isUserInfoExpanded, setIsUserInfoExpanded] = useState(false)
  const currentUserId = useSelector(state => state.user.userId)
  const userId = route.params !== undefined ? route.params.userId : currentUserId
  console.log(currentUserId, userId)
  const count = 15
  const offset = useRef(0) 
  const remainToFetch = useRef(null)
  const [userData, setUserData] = useState([])

  const [isLoading, setIsLoading] = useState(true) 
  const userInfoUrlFields = 'friend_status,followers_count,photo_200,online,last_seen,counters,status,can_send_friend_request,can_write_private_message,can_post,relation,bdate,city,interests,home_town,personal,education,universities,screen_name'
  const userInfoUrl = `https://api.vk.com/method/users.get?access_token=${accessToken}&v=5.131&user_ids=${userId}&fields=${userInfoUrlFields}`
  const userWallUrl = `https://api.vk.com/method/wall.get?access_token=${accessToken}&v=5.131&owner_id=${userId}&extended=1&count=${count}`
  const [wallHeaderData , setWallHeaderData] = useState({screenName: 'Profile'})
  
  //TODO:
  //const allData = Promise.all([fetchReq1, fetchReq2, fetchReq3]);
  //allData.then((res) => console.log(res));
  // [
  //   {title: "delectus aut autem"},
  //   {title: "quis ut nam facilis et officia qui"},
  //   {title: "fugiat veniam minus"}
  // ]

  const fetchData = async () => {
    const userInfoResponse = await fetch(userInfoUrl)
    const userWallContentResponse = await fetch(userWallUrl)
    const userInfoData = await userInfoResponse.json()
    const userWallContentData = await userWallContentResponse.json()
    let isOnlineUsingMobile
    let isOnlineUsingPC
    if (userInfoData.response[0].online === 1 && (userInfoData.response[0].online_app || userInfoData.response[0].online_mobile)) {
      isOnlineUsingMobile = true
      isOnlineUsingPC = false
    } else if (userInfoData.response[0].online === 1) {
      isOnlineUsingMobile = false
      isOnlineUsingPC = true
    } else {
      isOnlineUsingMobile = false
      isOnlineUsingPC = false
    }
    setWallHeaderData({
      userName: `${userInfoData.response[0].first_name} ${userInfoData.response[0].last_name}`,
      canAccessClosed: userInfoData.response[0].can_access_closed, 
      isClosed: userInfoData.response[0].is_closed,
      isOnlineUsingMobile: isOnlineUsingMobile,
      isOnlineUsingPC: isOnlineUsingPC,
      friendStatus: userInfoData.response[0].friend_status,
      avatarUrl: userInfoData.response[0].photo_200,
      status: userInfoData.response[0].status,
      counters: userInfoData.response[0].counters,
      lastSeen: userInfoData.response[0].last_seen,
      canSendFriendRequest: userInfoData.response[0].can_send_friend_request,
      canWritePrivateMessage: userInfoData.response[0].can_write_private_message,
      canPost: userInfoData.response[0].can_post === 1 ? true : false,
      personal: userInfoData.response[0].personal,
      relation: userInfoData.response[0].relation,
      bdate: userInfoData.response[0].bdate,
      city: userInfoData.response[0].city,
      interests: userInfoData.response[0].interests,
      homeTown: userInfoData.response[0].home_town,
      education: userInfoData.response[0].education,
      universities: userInfoData.response[0].universities,
      screenName: userInfoData.response[0].screen_name
    })
    if (userWallContentData.error === undefined) {
      const items = userWallContentData.response.items.map(item => {
        const preparedItem = findPostAuthor(item, userWallContentData.response.profiles, userWallContentData.response.groups)
        return preparedItem
      })
      setUserData(items)
      offset.current += count
      remainToFetch.current = userWallContentData.response.count - count
    } else if (userWallContentData.error.error_code === 30) {
      remainToFetch.current = 0
    }
    setIsLoading(false)
  }

  const fetchMore = async () => {
    const fetchMoreWallContentUrl = `https://api.vk.com/method/wall.get?access_token=${accessToken}&v=5.131&owner_id=${userId}&extended=1&count=${count}&offset=${offset.current}`
    const wallContentResponse = await fetch(fetchMoreWallContentUrl)
    const wallContent = await wallContentResponse.json()
    if (wallContent.error === undefined) {
      const items = wallContent.response.items.map(item => {
        const preparedItem = findPostAuthor(item, wallContent.response.profiles, wallContent.response.groups)
        return preparedItem
      })
      setUserData(prevState => prevState.concat(items))
      offset.current += count
      remainToFetch.current -= count
    }
  }

  const openDrawer = () => {
    navigation.openDrawer()
  }

  const goBack = () => {
    navigation.goBack()
  }

  useEffect(() => {
    fetchData()
  }, [])

  const listHeader = () => (
    <View style={styles.wallHeaderContainer}>
      <WallHeaderGeneralInfo 
        name={wallHeaderData.userName}
        avatarUrl={wallHeaderData.avatarUrl}
        status={wallHeaderData.status}
        lastSeen={wallHeaderData.lastSeen}
        isOnlineUsingMobile={wallHeaderData.isOnlineUsingMobile}
        isOnlineUsingPC={wallHeaderData.isOnlineUsingPC}
        chevronPressHandler={setIsUserInfoExpanded}
        expanded={isUserInfoExpanded}
      /> 
      <WallHeaderPersonalContainer 
        personal={wallHeaderData.personal}
        relation={wallHeaderData.relation}
        bdate={wallHeaderData.bdate}
        city={wallHeaderData.city}
        interests={wallHeaderData.interests}
        homeTown={wallHeaderData.homeTown}
        education={wallHeaderData.education}
        universities={wallHeaderData.universities}
        isLightTheme={isLightTheme}
        expanded={isUserInfoExpanded}    
      /> 
      <WallHeaderButtons
        isUserWall={true}  
        friendStatus={wallHeaderData.friendStatus}
        canSendFriendRequest={wallHeaderData.canSendFriendRequest}
        canWritePrivateMessage={wallHeaderData.canWritePrivateMessage}
      />
      <DividerWithLine dividerHeight={10}/>
      <WallHeaderCountersGrid 
        counters={wallHeaderData.counters} 
        navigation={navigation} 
        ownerId={userId}
        canAccess={!(wallHeaderData.canAccessClosed === false && wallHeaderData.isClosed === true)}
      />
      {
        wallHeaderData.canAccessClosed === false && wallHeaderData.isClosed === true ?
        <WallIsPrivateText isPrivateText={'Profile is private'}/> : null
      }
      <WallHeaderPostSuggestButton canPost={wallHeaderData.canPost}/>
    </View>
  )

  const renderItem = ({item}) => {
    if (item.copy_history !== undefined) {
      return (
        <Repost 
          isLightMode={isLightTheme} 
          data={item} 
          openedPost={true} 
          navigation={navigation} 
          id={item.key}
          accessToken={accessToken}
        />
      )
    }
    return (
      <Post 
        data={item} 
        navigation={navigation} 
        openedPost={true} 
        isLigthTheme={isLightTheme} 
        isProfileContent={true}
        id={item.key}
        accessToken={accessToken}
      />
    )
  }

  const listFooter = () => {
    if (remainToFetch.current > 0) {
      return (
        <View style={[{justifyContent: 'center'}]}>
          <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={40}/>
        </View>
      )
    }
    return null
  }

  // console.log(navigation.getParent())
  return (
    <SafeAreaView style={[styles.mainContainer, isLightTheme ? {backgroundColor: COLORS.light_smoke} : {backgroundColor: COLORS.background_dark}]}>
      <StatusBar backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} barStyle={COLORS.white}/>
      <CustomHeader 
        iconComponent={
          currentUserId === userId ?
          <Entypo name='menu' color={COLORS.white} size={30}/> :
          <AntDesign name='arrowleft' size={30} color={COLORS.white}/>
        }
        isLightTheme={isLightTheme}
        iconTouchHandler={currentUserId === userId ? openDrawer : goBack}
        headerName={<ProfileHeaderName userShortName={wallHeaderData.screenName}/>}
        isScreenFromDrawerMenu={userId === currentUserId}
        navigation={navigation}
      />
      {
        isLoading ?
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={50} color={isLightTheme ? COLORS.primary : COLORS.white}/>
        </View> :
        <> 
          <FlatList
            data={userData}
            style={styles.list}
            ListHeaderComponent={listHeader}
            renderItem={renderItem}
            ListFooterComponent={listFooter}
            onEndReached={fetchMore}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.8}
          />
        </>
      }
    </SafeAreaView>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: COLORS.light_smoke
  },
  // mainContainerDark: {
  //   flex: 1,
  //   backgroundColor: COLORS.background_dark
  // },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    marginLeft: 5,
    marginRight: 5,
  },
  wallHeaderContainer: {
    padding: 10,
    backgroundColor: COLORS.very_dark_gray,
    borderRadius: 5,
    marginTop: 5,
    // flexGrow: 1,
    // flex:1
  },
  privateProfileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})