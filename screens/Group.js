import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
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

//TODO: replace selectors on usestate
const Group = ({navigation, route}) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.user.accessToken)
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const [wallHeaderData, setWallHeaderData] = useState({})
  const [groupData, setGroupData] = useState([])
  const offset = useRef(0)
  const remainToFetchNum = useRef(null)
  const count = 20
  const { groupId } = route.params

  // const groupData = useSelector(state => state.group)
  // const groupID = groupData.id  
  // const offset = groupData.offset  
  // const postData = groupData.items 
  // const totalPostCount = groupData.totalPostCount
  
  const fetchGroupWallContentUrl = `https://api.vk.com/method/wall.get?access_token=${accessToken}&count=${count}&v=5.131&extended=1&owner_id=${-1 * groupId}`
  const fetchGroupInfoUrl = `https://api.vk.com/method/groups.getById?access_token=${accessToken}&v=5.131&group_id=${groupId}&fields=members_count,counters,description,status,can_message`
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
    setWallHeaderData(prevState => ({
      ...prevState,
      communityName: groupHeaderData.response[0].name,
      communityMembersCount: groupHeaderData.response[0].members_count,
      communityAvatarUrl: groupHeaderData.response[0].photo_200,
      communityStatus: groupHeaderData.response[0].status,
      isMemberOfCommunity: groupHeaderData.response[0].is_member === 1 ? true : false,
      counters: groupHeaderData.response[0].counters,
      canMessage: groupHeaderData.response[0].can_message
    }))
    
    
    data.response.items.forEach((item, index, array) => {
      array[index] = {...item, key: uuid.v4()}
    })
    
    remainToFetchNum.current = data.response.count - count
    offset.current += count 
    setGroupData(data.response.items)
    dispatch(setData(data.response))
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
      data.response.items.forEach((item, index, array) => {
        array[index] = {...item, key: uuid.v4()}
      })
      offset.current += count
      remainToFetchNum.current -= count
      setGroupData(prevState => prevState.concat(data.response.items))
      dispatch(pushData(data.response))
    })
  }

  const listHeader = () => (
    <WallHeader
      name={wallHeaderData.communityName}
      membersCount={wallHeaderData.communityMembersCount}
      avatarUrl={wallHeaderData.communityAvatarUrl}
      status={wallHeaderData.communityStatus}
      isMember={wallHeaderData.isMemberOfCommunity} 
      counters={wallHeaderData.counters}
      canWritePrivateMessage={wallHeaderData.canMessage}
      ownerId={-1 * groupId}
      navigation={navigation}
    />
  )

  const keyExtractor = (item) => {
    return item.key
  }

  const renderItem = ({item}) => {
    if(item.copy_history !== undefined) {
      return <Repost isLightMode={isLightTheme} data={item} openedPost={true} navigation={navigation} isCommunityContent={true}/>
    } 
    return <Post data={item} navigation={navigation} openedPost={true} isCommunityContent={true} isLigthTheme={isLightTheme}/>
  }

  const listFooter = () => {
    if (remainToFetchNum.current > 0) {
      return (
        <>
          <View style={[{justifyContent: 'center'}, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColorL: COLORS.primary_dark}]}>
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
    <SafeAreaView style={isLightTheme ? styles.feedContainerLight : styles.feedContainerDark}>
      <StatusBar backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} barStyle={COLORS.white}/>
      <CustomHeader 
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
        headerName={<Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Community</Text>}
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
    marginRight: 5
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
  }
})