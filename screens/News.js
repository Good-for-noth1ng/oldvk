import { View, Text, RefreshControl, SafeAreaView, StatusBar, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import uuid from 'react-native-uuid';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../constants/theme';
import Post from '../components/Post'
import { setItems, setGroups, setProfiles, pushItems, pushGroups, pushProfiles, setNextFrom } from '../redux/newsSlice';
import { Header } from '@react-navigation/elements';

//TODO make news upload from redux directly
const News = ({navigation, route}) => {

  const drawerNavigator = navigation.getParent()
  useLayoutEffect(() => {
    const hideHeader = navigation.addListener('blur', () => {
      drawerNavigator.setOptions({
        swipeEnabled: false, 
        header: () => { 
        return <Header 
          headerTitle='Post'
          // headerTitleAlign={'left'}
          // headerTintColor={COLORS.white}
          // headerTitleStyle={{color: COLORS.white}}
          // headerStyle={{backgroundColor: COLORS.primary, }}
        />}
      })
    })
    return hideHeader;
  }, [navigation])
  // useLayoutEffect(() => {
  //   const hideHeader = navigation.addListener('blur', () => {
  //     drawerNavigator.setOptions({headerShown: false, swipeEnabled: false})
  //   })
  //   return hideHeader;
  // }, [navigation])

  // useLayoutEffect(() => {
  //   const showHeader = navigation.addListener('focus', () => {
  //     drawerNavigator.setOptions({
  //           headerShown: true,
  //           drawerLabelStyle: {
  //             marginLeft: -10,
  //           },
  //           headerStyle: {
  //             backgroundColor: COLORS.primary,
  //           },
  //           headerTintColor: COLORS.white,
  //           drawerInactiveTintColor: COLORS.white,
  //           drawerActiveTintColor: COLORS.white,
  //           swipeEnabled: true
  //         })
  //   })
  //   return showHeader
  // }, [navigation])
         
  
  const accessToken = useSelector(state => state.user.accessToken)
  const dispatch = useDispatch()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showedPosts, setShowedPosts] = useState(7)
  const initPostContent = useSelector(state => state.news.items)
  const [postContent, setPostContent] = useState(initPostContent)
  const currentNewsPage = useSelector(state => state.news.currentPage)
  const nextFrom = useSelector(state => state.news.nextFrom)

  let newsUrl
  if (currentNewsPage === 'News') {
    newsUrl = `https://api.vk.com/method/newsfeed.get?return_banned=0&access_token=${accessToken}&count=25&v=5.131`
  } else {
    newsUrl = `https://api.vk.com/method/newsfeed.getRecommended?return_banned=0&access_token=${accessToken}&count=25&v=5.131`
  }
  
  useEffect(()=> {
    const fetchNews = async () => {
      setIsLoading(true);    
      fetch(newsUrl)
        .then((response) => response.json())
        .then((data) => {
          const items = data.response.items.map(item => {  
            return {...item, key: uuid.v4()}
          })
          dispatch(setItems(items));
          dispatch(setGroups(data.response.groups));
          dispatch(setProfiles(data.response.profiles));
          dispatch(setNextFrom(data.response.next_from));
          setPostContent(items)
          setIsLoading(false);
        });
    }
    fetchNews();
  }, [currentNewsPage])
  
  const fetchRefreshData = () => {
    setIsLoading(true)
    let refreshUrl
    if (currentNewsPage === 'News') {
      refreshUrl = `https://api.vk.com/method/newsfeed.get?return_banned=0&access_token=${accessToken}&start_from=${nextFrom}&v=5.131`
    } else {
      refreshUrl = `https://api.vk.com/method/newsfeed.getRecommended?return_banned=0&access_token=${accessToken}&start_from=${nextFrom}&v=5.131`
    }
    fetch(refreshUrl)
      .then(response => response.json())
      .then((data) => {
        const items = data.response.items.map(item => {  
          return {...item, key: uuid.v4()}
        })
        dispatch(setItems(items));
        dispatch(setGroups(data.response.groups));
        dispatch(setProfiles(data.response.profiles));
        dispatch(setNextFrom(data.response.next_from));
        setIsLoading(false)
        postContent = useSelector(state => state.news.items);
      })
  }

  const fetchMoreData = () => {
    let fetchMoreDataUrl
    if (currentNewsPage === 'News') {
      fetchMoreDataUrl = `https://api.vk.com/method/newsfeed.get?return_banned=0&access_token=${accessToken}&count=25&start_from=${nextFrom}&v=5.131`
    } else {
      fetchMoreDataUrl = `https://api.vk.com/method/newsfeed.getRecommended?return_banned=0&access_token=${accessToken}&count=25&start_from=${nextFrom}&v=5.131`
    }
    fetch(fetchMoreDataUrl)
        .then((response) => response.json())
        .then((data) => {
          const items = data.response.items.map(item => {  
            return {...item, key: uuid.v4()}
          })
          dispatch(pushItems(items));
          dispatch(pushGroups(data.response.groups));
          dispatch(pushProfiles(data.response.profiles));
          dispatch(setNextFrom(data.response.next_from));
          const newPostContent = postContent.concat(items);
          setPostContent(newPostContent);
      });
    
  }

  const renderItem = ({item}) => (
    <Post data={item} navigation={navigation} openedPost={true}/>
  )

  return(
    <View style={styles.newsBackground}>
      <SafeAreaView>
        <StatusBar backgroundColor={COLORS.primary} />
          {isLoading ?
            <View style={styles.spinnerContainer}>
              <ActivityIndicator color={COLORS.primary} size={50}/>
            </View> :
            <View>
              <FlatList 
                data={postContent}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                initialNumToRender={showedPosts}
                onEndReached={() => {fetchMoreData()}}
                refreshControl={
                  <RefreshControl 
                    refreshing={isLoading} 
                    onRefresh={fetchRefreshData} 
                    colors={[COLORS.primary]} 
                    tintColor={COLORS.primary}
                  />
                }
                ListFooterComponent={
                  <View style={styles.bottomSpinnerContainer}>
                    <ActivityIndicator color={COLORS.primary} size={50}/>
                  </View>
                }
                maxToRenderPerBatch={5}
                removeClippedSubviews={true}
              />
            </View>
        } 
      </SafeAreaView>
    </View>
  )
}
const styles = StyleSheet.create({
  spinnerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  newsBackground: {
    backgroundColor: COLORS.light_smoke
  },
  bottomSpinnerContainer: {
    justifyContentL: 'center',
  }
})
export default News