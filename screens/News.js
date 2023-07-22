import { View, Text, RefreshControl, SafeAreaView, StatusBar, ActivityIndicator, StyleSheet, useColorScheme, Appearance } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
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
import Repost from '../components/Repost';
import { FlashList } from "@shopify/flash-list";
import { FlatList } from "react-native-gesture-handler";
//TODO npx expo install @shopify/flash-list expo-dev-client
//TODO fix comments, likes etc. being undefined
//TODO make news upload from redux directly
const News = ({navigation}) => {
  const drawerNavigator = navigation.getParent()
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  
  const subscribeOnBlur = () => {
    const hideHeader = navigation.addListener('blur', () => {
      drawerNavigator.setOptions({headerShown: false, swipeEnabled: false})
    })
    return hideHeader
  }

  const subscribeOnFocus = () => {
    const showHeader = navigation.addListener('focus', () => {
      drawerNavigator.setOptions({headerShown: false, swipeEnabled: true})
    })
    return showHeader
  }
         
  const accessToken = useSelector(state => state.user.accessToken)
  const dispatch = useDispatch()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // const [isFetchingMoreData, setIsFetchingMoreData] = useState(false)
  const initPostContent = useSelector(state => state.news.items)
  const [postContent, setPostContent] = useState(initPostContent)
  const currentNewsPage = useSelector(state => state.news.currentPage)
  const nextFrom = useSelector(state => state.news.nextFrom)

  let newsUrl
  if (currentNewsPage === 'News') {
    newsUrl = `https://api.vk.com/method/newsfeed.get?return_banned=0&access_token=${accessToken}&count=20&v=5.131`
  } else {
    newsUrl = `https://api.vk.com/method/newsfeed.getRecommended?return_banned=0&access_token=${accessToken}&count=20&v=5.131`
  }

  const fetchNews = () => {
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

  useEffect(()=> {
    subscribeOnBlur();
    subscribeOnFocus();
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
        setPostContent(items)
        setIsLoading(false)
      })
  }

  const fetchMoreData = () => {
    let fetchMoreDataUrl
    if (currentNewsPage === 'News') {
      fetchMoreDataUrl = `https://api.vk.com/method/newsfeed.get?return_banned=0&access_token=${accessToken}&count=20&start_from=${nextFrom}&v=5.131`
    } else {
      fetchMoreDataUrl = `https://api.vk.com/method/newsfeed.getRecommended?return_banned=0&access_token=${accessToken}&count=20&start_from=${nextFrom}&v=5.131`
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
  
  const handleDrawerOpening = () => {
    navigation.openDrawer()
  }

  const renderItem = ({item}) => {
    if(item.copy_history !== undefined) {
      return <Repost data={item} openedPost={true} navigation={navigation} isLightMode={isLightTheme}/>
    } else if (item.type === 'wall_photo') {
      return null
    }
    return <Post data={item} navigation={navigation} openedPost={true} isLigthTheme={isLightTheme}/>
  }

  const listFooterComponent = () => {
    return (
      <>
        <View style={styles.bottomSpinnerContainer}>
          <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
        </View>
        <DividerWithLine dividerHeight={5} marginB={60}/>
      </>
    )
  }
  
  const keyExtractor = (item) => {
    return item.key
  }
  
  return(
    <SafeAreaView style={isLightTheme ? styles.newsBackgroundLight : styles.newsBackgroundDark}>
      <StatusBar backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} barStyle={COLORS.white} animated={true}/>
      <CustomHeader 
        headerName={<NewsTitleSwitcher isLightTheme={isLightTheme}/>} 
        iconComponent={<Entypo name='menu' color={COLORS.white} size={30}/>}
        iconTouchHandler={handleDrawerOpening}
        isLightTheme={isLightTheme}
        isScreenFromDrawerMenu={true}
        navigation={navigation}
      />
        {isLoading ?
          <View style={styles.spinnerContainer}>
            <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
          </View> :
          <FlatList 
            data={postContent}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            initialNumToRender={4}
            onEndReached={fetchMoreData}
            style={styles.listContainer}
            keyExtractor={keyExtractor}
            onEndReachedThreshold={1}
            refreshControl={
              <RefreshControl 
                refreshing={isLoading} 
                onRefresh={fetchRefreshData} 
                colors={[COLORS.primary, COLORS.white]} 
                tintColor={isLightTheme ? COLORS.primary : COLORS.white}
              />
            }
            ListFooterComponent={listFooterComponent}
            removeClippedSubviews={true}
            updateCellsBatchingPeriod={30}
          />
      } 
    </SafeAreaView>
  )
}

export default News

const styles = StyleSheet.create({
  spinnerContainer: {
    width: '100%',
    height: '90%',
    justifyContent: 'center'
  },
  newsBackgroundLight: {
    backgroundColor: COLORS.light_smoke,
  },
  newsBackgroundDark: {
    backgroundColor: COLORS.background_dark
  },
  listContainer: {
    marginLeft: 5,
    marginRight: 5,
  },
  bottomSpinnerContainer: {
    justifyContentL: 'center',
  }
})
