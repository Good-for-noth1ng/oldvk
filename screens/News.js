import { View, Text, RefreshControl, SafeAreaView, StatusBar, ActivityIndicator, StyleSheet, FlatList, useColorScheme, Appearance, PanResponder, } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { COLORS } from '../constants/theme';
import Post from '../components/Post'
import Entypo from 'react-native-vector-icons/Entypo'
// import { setItems, setGroups, setProfiles, pushItems, pushGroups, pushProfiles, setNextFrom } from '../redux/newsSlice';
// import { Header } from '@react-navigation/elements';
import CustomHeader from '../components/CustomHeader';
import NewsTitleSwitcher from '../components/NewsTitleSwitcher';
import DividerWithLine from '../components/DividerWithLine';
import Repost from '../components/Repost';
import GlobalShadow from '../components/GlobalShadow';
import PostDropdownMenu from '../components/PostDropdownMenu';
// import { FlatList } from "react-native-gesture-handler";
import { findPostAuthor } from '../utils/dataPreparationForComponents';

//TODO fix comments, likes etc. being undefined
const News = ({navigation}) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const count = 20
         
  const accessToken = useSelector(state => state.user.accessToken)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const nextFrom = useRef('')
  // const [isFetchingMoreData, setIsFetchingMoreData] = useState(false)
  const [postContent, setPostContent] = useState([])
  const currentNewsPage = useSelector(state => state.news.currentPage)
  const shouldRemoveStackScreens = useRef()

  let newsUrl
  if (currentNewsPage === 'News') {
    newsUrl = `https://api.vk.com/method/newsfeed.get?return_banned=0&access_token=${accessToken}&count=${count}&v=5.131`
  } else {
    newsUrl = `https://api.vk.com/method/newsfeed.getRecommended?return_banned=0&access_token=${accessToken}&count=${count}&v=5.131`
  }

  const fetchNews = () => {
    setIsLoading(true);    
    fetch(newsUrl)
      .then((response) => response.json())
      .then((data) => {
        const items = data.response.items.map(item => { 
          const preparedItem = findPostAuthor(item, data.response.profiles, data.response.groups)
          return preparedItem
        })
        nextFrom.current = data.response.next_from
        setPostContent(items)
        setIsLoading(false);
      });
  }

  useEffect(()=> {
    fetchNews();
  }, [currentNewsPage])

  useEffect(() => {
    const drawerNavigator = navigation.getParent()
    const blur = drawerNavigator.addListener('blur', () => {
      shouldRemoveStackScreens.current = false
    })
    const focus = drawerNavigator.addListener('focus', () => {
      shouldRemoveStackScreens.current = true
    })
    const drawerItemPress = drawerNavigator.addListener('drawerItemPress', (e) => {
      if (shouldRemoveStackScreens.current) {
        navigation.popToTop()
      }
    })
    return blur, focus, drawerItemPress
  }, [navigation])

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
          const preparedItem = findPostAuthor(item, data.response.profiles, data.response.groups)
          return preparedItem
        })
        nextFrom.current = data.response.next_from
        // dispatch(setItems(items));
        // dispatch(setGroups(data.response.groups));
        // dispatch(setProfiles(data.response.profiles));
        // dispatch(setNextFrom(data.response.next_from));
        setPostContent(items)
        setIsLoading(false)
      })
  }

  const fetchMoreData = () => {
    let fetchMoreDataUrl
    if (currentNewsPage === 'News') {
      fetchMoreDataUrl = `https://api.vk.com/method/newsfeed.get?return_banned=0&access_token=${accessToken}&count=20&start_from=${nextFrom.current}&v=5.131`
    } else {
      fetchMoreDataUrl = `https://api.vk.com/method/newsfeed.getRecommended?return_banned=0&access_token=${accessToken}&count=20&start_from=${nextFrom.current}&v=5.131`
    }
    fetch(fetchMoreDataUrl)
      .then((response) => response.json())
      .then((data) => {
        const items = data.response.items.map(item => {  
          const preparedItem = findPostAuthor(item, data.response.profiles, data.response.groups)
          return preparedItem
        })
        nextFrom.current = data.response.next_from
        setPostContent(prevState => prevState.concat(items));
      });
  }
  
  const handleDrawerOpening = () => {
    navigation.openDrawer()
  }

  const renderItem = ({item}) => {
    if(item.copy_history !== undefined) {
      return (
        <Repost 
          data={item} 
          openedPost={true} 
          navigation={navigation} 
          isLightMode={isLightTheme}
          id={item.key}
          accessToken={accessToken}
        />
      )
    } else if (item.type === 'wall_photo' || item.type === 'friend') {
      return null
    }
    return (
      <Post 
        data={item} 
        navigation={navigation} 
        openedPost={true} 
        isLigthTheme={isLightTheme} 
        id={item.key}
        accessToken={accessToken}
      />
    )
  }

  const listFooterComponent = () => {
    return (
      <>
        <View style={styles.bottomSpinnerContainer}>
          <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={40}/>
        </View>
      </>
    )
  }
  
  const keyExtractor = (item) => {
    return item.key
  }
  
  return(
    <SafeAreaView style={[{flex: 1}, isLightTheme ? {backgroundColor: COLORS.light_smoke} : {backgroundColor: COLORS.background_dark}]}>
      <CustomHeader 
        headerName={<NewsTitleSwitcher isLightTheme={isLightTheme}/>} 
        iconComponent={<Entypo name='menu' color={COLORS.white} size={30}/>}
        iconTouchHandler={handleDrawerOpening}
        isLightTheme={isLightTheme}
        isScreenFromDrawerMenu={true}
        navigation={navigation}
      />
        {
          isLoading ?
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
            onEndReachedThreshold={0.8}
            refreshControl={
              <RefreshControl 
                refreshing={isLoading} 
                onRefresh={fetchRefreshData} 
                colors={[COLORS.primary, COLORS.white]} 
                tintColor={isLightTheme ? COLORS.primary : COLORS.white}
              />
            }
            // CellRendererComponent={({children}) => children}
            ListFooterComponent={listFooterComponent}
            removeClippedSubviews={true}
            updateCellsBatchingPeriod={30}
          />
      } 
      <PostDropdownMenu />
      <GlobalShadow />
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
    zIndex: 4
  },
  bottomSpinnerContainer: {
    justifyContentL: 'center',
  }
})
