import { View, Text, RefreshControl, SafeAreaView, StatusBar, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState, useLayoutEffect, useCallback, memo } from 'react'
import uuid from 'react-native-uuid';
import { useSelector, useDispatch, } from 'react-redux';
import { COLORS } from '../constants/theme';
import Post from '../components/Post'
import Entypo from 'react-native-vector-icons/Entypo'
import { setItems, setGroups, setProfiles, pushItems, pushGroups, pushProfiles, setNextFrom } from '../redux/newsSlice';
import { Header } from '@react-navigation/elements';
import CustomHeader from '../components/CustomHeader';
import NewsTitleSwitcher from '../components/NewsTitleSwitcher';
import DividerWithLine from '../components/DividerWithLine';

//TODO make news upload from redux directly
const News = ({navigation, route}) => {
  const drawerNavigator = navigation.getParent()
  
  useLayoutEffect(() => {
    const hideHeader = navigation.addListener('blur', () => {
      drawerNavigator.setOptions({headerShown: false, swipeEnabled: false})
    })
    return hideHeader;
  }, [navigation])

  useLayoutEffect(() => {
    const showHeader = navigation.addListener('focus', () => {
      drawerNavigator.setOptions({
            headerShown: false,
            swipeEnabled: true
          })
    })
    return showHeader
  }, [navigation])
         
  
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
  
  const handleDrawerOpening = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])

  const renderItem =  ({item}) => (
    <Post data={item} navigation={navigation} openedPost={true}/>
  )

  return(
    <View style={styles.newsBackground}>
      <SafeAreaView>
        <StatusBar backgroundColor={COLORS.primary} barStyle={COLORS.white} animated={true}/>
        <CustomHeader 
          headerName={<NewsTitleSwitcher />} 
          iconComponent={<Entypo name='menu' color={COLORS.white} size={30}/>}
          iconTouchHandler={handleDrawerOpening}
        />
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
                style={{backgroundColor: COLORS.light_smoke}}
                refreshControl={
                  <RefreshControl 
                    refreshing={isLoading} 
                    onRefresh={fetchRefreshData} 
                    colors={[COLORS.primary]} 
                    tintColor={COLORS.primary}
                  />
                }
                ListFooterComponent={
                  <>
                    <View style={styles.bottomSpinnerContainer}>
                      <ActivityIndicator color={COLORS.primary} size={50}/>
                    </View>
                    <DividerWithLine dividerHeight={5} marginB={175}/>
                  </>
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
export default memo(News)