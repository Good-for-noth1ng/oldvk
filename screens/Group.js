import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from 'react-redux'
import { COLORS } from '../constants/theme'
import CustomHeader from '../components/CustomHeader'
import AntDesign from 'react-native-vector-icons/AntDesign'
import uuid from 'react-native-uuid';
import Post from '../components/Post'
import { setData, pushData } from '../redux/groupSlice'
import Repost from '../components/Repost'
import WallHeader from '../components/WallHeader'
import DividerWithLine from '../components/DividerWithLine'
import WallHeaderGeneralInfo from '../components/WallHeaderGeneralInfo';
import WallHeaderCountersGrid from '../components/WallHeaderCountersGrid';
import WallHeaderButtons from '../components/WallHeaderButtons';
import WallHeaderPostSuggestButton from '../components/WallHeaderPostSuggestButton';
import WallHeaderAdditionalInfo from '../components/WallHeaderAdditionalInfo'
import WallIsPrivateText from '../components/WallIsPrivateText';
import { cleanAdditionalInfoLinksAndUsers } from '../utils/dataPreparationForComponents'
import ProfileHeaderName from '../components/ProfileHeaderName';
//TODO: replace selectors on usestate
const Group = ({navigation, route}) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.user.accessToken)
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const [wallHeaderData, setWallHeaderData] = useState({screenName: 'Community'})
  const [groupData, setGroupData] = useState([])
  const offset = useRef(0)
  const remainToFetchNum = useRef(null)
  const count = 20
  const { groupId } = route.params
  const [isAdditionalInfoExpanded, setIsAdditionalInfoExpanded] = useState(false)
  // const groupData = useSelector(state => state.group)
  // const groupID = groupData.id  
  // const offset = groupData.offset  
  // const postData = groupData.items 
  // const totalPostCount = groupData.totalPostCount
  const fields = 'members_count,counters,description,status,can_message,description,contacts,addresses,screen_name,links,main_section,can_post,can_suggest' 
  const fetchGroupWallContentUrl = `https://api.vk.com/method/wall.get?access_token=${accessToken}&count=${count}&v=5.131&extended=1&owner_id=${-1 * groupId}`
  const fetchGroupInfoUrl = `https://api.vk.com/method/groups.getById?access_token=${accessToken}&v=5.131&group_id=${groupId}&fields=${fields}`
  const [isLoading, setIsLoading] = useState(true)  
  
  console.log(groupId)

  const goBack = () => {
    navigation.goBack()
  }

  const fetchData = async () => {
    const response = await fetch(fetchGroupWallContentUrl)
    const groupHeaderResponse = await fetch(fetchGroupInfoUrl)
    const data = await response.json()
    const groupHeaderData = await groupHeaderResponse.json()
    const contactsIds = groupHeaderData.response[0].contacts?.map(item => item.user_id)
    const contacts = await fetch(`https://api.vk.com/method/users.get?access_token=${accessToken}&v=5.131&user_ids=${contactsIds}&fields=photo_100`)
    const contactsDetailedRes = await contacts.json()
    const contactsDetailed = contactsDetailedRes.response
    const {cleanedLinks, cleanedUsers} = cleanAdditionalInfoLinksAndUsers(groupHeaderData.response[0].links, groupHeaderData.response[0].contacts, contactsDetailed)
    setWallHeaderData({
      communityName: groupHeaderData.response[0].name,
      communityMembersCount: groupHeaderData.response[0].members_count,
      communityAvatarUrl: groupHeaderData.response[0].photo_200,
      communityStatus: groupHeaderData.response[0].status,
      isMemberOfCommunity: groupHeaderData.response[0].is_member === 1 ? true : false,
      counters: groupHeaderData.response[0].counters,
      canMessage: groupHeaderData.response[0].can_message,
      description: groupHeaderData.response[0].description,
      cleanedLinks,
      cleanedUsers,
      screenName: groupHeaderData.response[0].screen_name,
      canSuggest: groupHeaderData.response[0].can_suggest === 1 ? true : false,
      canPost: groupHeaderData.response[0].can_post === 1 ? true : false
      // contacts: groupHeaderData.response[0].contacts,
      // contactsDetailed: contactsDetailed,
      // links: groupHeaderData.response[0].links
    })
    // console.log(groupHeaderData.response[0].contacts)
    // console.log(data)
    if (data.error === undefined) {
      data.response.items.forEach((item, index, array) => {
        const key = uuid.v4()
        array[index] = {...item, key}
      })
      remainToFetchNum.current = data.response.count - count
      setGroupData(data.response.items)
      setWallHeaderData(prevState => ({...prevState, canAccess: true}))
      dispatch(setData(data.response))
    } else {
      setGroupData([])
      setWallHeaderData(prevState => ({...prevState, canAccess: false}))
      // dispatch(setData(data.response))
    }

    offset.current += count 
    
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchMoreData = () => {
    const url = `https://api.vk.com/method/wall.get?owner_id=${-1 * groupId}&access_token=${accessToken}&extended=1&count=${count}&offset=${offset.current}&v=5.131`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.error === undefined) {
        data.response.items.forEach((item, index, array) => {
          const key = uuid.v4()
          array[index] = {...item, key}
        })
        offset.current += count
        remainToFetchNum.current -= count
        setGroupData(prevState => prevState.concat(data.response.items))
        dispatch(pushData(data.response))
      }
    })
  }

  const listHeader = () => (
    <View style={styles.headerContainer}>
      <WallHeaderGeneralInfo 
        name={wallHeaderData.communityName}
        avatarUrl={wallHeaderData.communityAvatarUrl}
        status={wallHeaderData.communityStatus}
        chevronPressHandler={setIsAdditionalInfoExpanded}
        expanded={isAdditionalInfoExpanded}
      />
      <WallHeaderAdditionalInfo 
          description={wallHeaderData.description}
          cleanedLinks={wallHeaderData.cleanedLinks}
          cleanedUsers={wallHeaderData.cleanedUsers}
          navigation={navigation}
          expanded={isAdditionalInfoExpanded}
      /> 
      <WallHeaderButtons
        isUserWall={wallHeaderData.isUserWall} 
        isMember={wallHeaderData.isMemberOfCommunity} 
        canWritePrivateMessage={wallHeaderData.canMessage}
      />
      <DividerWithLine dividerHeight={10}/>
      <WallHeaderCountersGrid 
        membersCount={wallHeaderData.membersCount} 
        counters={wallHeaderData.counters} 
        ownerId={-1 * groupId} 
        navigation={navigation}
        canAccess={wallHeaderData.canAccess}
      />
      {
        !wallHeaderData.canAccess ? 
        <WallIsPrivateText isPrivateText={'Community is private'}/> : null 
      }
      <DividerWithLine dividerHeight={10}/>
      <WallHeaderPostSuggestButton canPost={wallHeaderData.canPost} canSuggest={wallHeaderData.canSuggest} isCommunityWall={true}/>
    </View>
  )

  const keyExtractor = (item) => {
    return item.key
  }

  const renderItem = ({item}) => {
    if(item.copy_history !== undefined) {
      return (
        <Repost 
          isLightMode={isLightTheme} 
          data={item} 
          openedPost={true} 
          navigation={navigation} 
          isCommunityContent={true}
          id={item.id}
        />
      )
    } 
    return (
      <Post 
        data={item} 
        navigation={navigation} 
        openedPost={true} 
        isCommunityContent={true} 
        isLigthTheme={isLightTheme}
        id={item.id}
      />
    )
  }

  const listFooter = () => {
    if (remainToFetchNum.current > 0) {
      return (
        <View style={[{justifyContent: 'center'}, isLightTheme ? {backgroundColor: COLORS.light_smoke} : {backgroundColorL: COLORS.background_dark}]}>
          <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={40}/>
        </View>
      )
    }
    return null
    // return (
    //   <DividerWithLine 
    //     dividerHeight={10} 
    //     marginB={10} 
    //     borderBL={5} 
    //     borderBR={5} 
    //     dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
    //   />
    // )
  }
  
  return (
    <SafeAreaView style={isLightTheme ? styles.feedContainerLight : styles.feedContainerDark}>
      <StatusBar backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} barStyle={COLORS.white}/>
      <CustomHeader 
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
        headerName={<ProfileHeaderName userShortName={wallHeaderData.screenName}/>}
        isLightTheme={isLightTheme}
      />
      {
        isLoading ?
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
        </View> : 
        <FlatList 
          data={groupData}
          renderItem={renderItem}
          initialNumToRender={4}
          keyExtractor={keyExtractor}
          removeClippedSubviews={true}
          onEndReached={fetchMoreData}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          style={styles.feed}
          ListHeaderComponent={listHeader}
          ListFooterComponent={listFooter}
          refreshControl={
            <RefreshControl 
              refreshing={isLoading} 
              onRefresh={fetchData} 
              colors={[COLORS.primary, COLORS.white]} 
              tintColor={isLightTheme ? COLORS.primary : COLORS.white}
            />
          }
        />
      }
    </SafeAreaView>
  )
}

export default Group

const styles = StyleSheet.create({
  spinnerContainer: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  feed: {
    marginLeft: 5,
    marginRight: 5,
  },
  feedContainerLight: {
    flex: 1,
    backgroundColor: COLORS.light_smoke,
  },
  feedContainerDark: {
    flex: 1,
    backgroundColor: COLORS.background_dark,
  },
  bottomSpinnerContainer: {
    justifyContent: 'center'
  },
  headerContainer: {
    padding: 10,
    backgroundColor: COLORS.very_dark_gray,
    borderRadius: 5,
    marginTop: 5
  },
})