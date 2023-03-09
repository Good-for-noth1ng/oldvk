import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { COLORS } from '../constants/theme'
import CustomHeader from '../components/CustomHeader'
import AntDesign from 'react-native-vector-icons/AntDesign'
import uuid from 'react-native-uuid';
import Post from '../components/Post'
import { pushProfiles, pushGroups } from '../redux/commentsSlice'
import { setData, pushData } from '../redux/groupSlice'
import Repost from '../components/Repost'

const Group = ({navigation}) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.user.accessToken)
  const groupID = useSelector(state => state.group.id) 
  const offset = useSelector(state => state.group.offset) 
  const [postsCount, setPostsCount] = useState(0)
  console.log(groupID)
  const fetchGroupWallContentUrl = `https://api.vk.com/method/wall.get?access_token=${accessToken}&count=20&v=5.131&extended=1&owner_id=${groupID}`
  const fetchGroupInfoUrl = `https://api.vk.com/method/groups.getById?access_token=${accessToken}&group_id=${groupID}&fields=members_count,counters,description,status`
  const [isLoading, setIsLoading] = useState(true)  
  const postData = useSelector(state => state.group.items) 
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  
  const goBack = () => {
    navigation.goBack()
  }

  const fetchData = async () => {
    const response = await fetch(fetchGroupWallContentUrl)
    const groupHeaderResponse = await fetch(fetchGroupInfoUrl)
    const data = await response.json()
    const groupHeaderData = await groupHeaderResponse.json()
    data.response.items.forEach((item, index, array) => {
      array[index] = {...item, key: uuid.v4()}
    })
    dispatch(setData(data.response))
    setPostsCount(data.response.count)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchMoreData = () => {
    const url = `https://api.vk.com/method/wall.get?owner_id=${groupID}&access_token=${accessToken}&extended=1&count=20&offset=${offset}&v=5.131`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      data.response.items.forEach((item, index, array) => {
        array[index] = {...item, key: uuid.v4()}
      })
      dispatch(pushData(data.response))
    })
  }

  const keyExtractor = (item) => {
    return item.key
  }

  const renderItem = ({item}) => {
    if(item.copy_history !== undefined) {
      return <Repost isLightMode={isLightTheme} data={item} openedPost={true} navigation={navigation} isCommunityContent={true}/>
    } 
    return <Post data={item} navigation={navigation} openedPost={true} isCommunityContent={true} isLigthTheme={isLightTheme}/>
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
          data={postData}
          renderItem={renderItem}
          initialNumToRender={4}
          keyExtractor={keyExtractor}
          removeClippedSubviews={true}
          onEndReached={fetchMoreData}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          style={styles.feed}
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
})