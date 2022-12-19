import { View, Text, RefreshControl, SafeAreaView, StatusBar, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import uuid from 'react-native-uuid';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../constants/theme';
import Post from '../components/Post'
import { setItems, setGroups, setProfiles } from '../redux/newsSlice';

const News = () => {
  const accessToken = useSelector(state => state.user.accessToken)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const postContent = useSelector(state => state.news.items)
  const currentNewsPage = useSelector(state => state.news.currentPage)
  let newsUrl
  if (currentNewsPage === 'News') {
    newsUrl = `https://api.vk.com/method/newsfeed.get?return_banned=0&access_token=${accessToken}&v=5.131`
  } else {
    newsUrl = `https://api.vk.com/method/newsfeed.getRecommended?return_banned=0&access_token=${accessToken}&v=5.131`
  }
  const commentsUrl = `https://api.vk.com/method/newsfeed.getComments?access_token=${accessToken}&v=5.131`
  
  useEffect(()=> {
    const fetchNews = async () => {
      setIsLoading(true)    
      fetch(newsUrl)
        .then((response) => response.json())
        .then((data) => {
          const items = data.response.items.map(item => {  
            return {...item, key: uuid.v4()}
          })
          dispatch(setItems(items));
          dispatch(setGroups(data.response.groups));
          dispatch(setProfiles(data.response.profiles));
          setIsLoading(false);
        })
    }
    fetchNews();
  }, [currentNewsPage])
  
  const renderItem = ({item}) => (
    <Post data={item}/>
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
                initialNumToRender={15}
                refreshControl={
                  <RefreshControl refreshing={isLoading} />
                }
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
  }
})
export default News