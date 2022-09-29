import { View, Text, SafeAreaView, StatusBar, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchInitNews } from '../redux/newsSlice';
import { COLORS } from '../constants/theme';
import Post from '../components/Post'
import { useEffect, useState } from 'react';

const News = () => {
  const loading = useSelector(state => state.news.loading);
  const accessToken = useSelector(state => state.user.accessToken)
  const [items, setItems] = useState(undefined)
  // const dispatch = useDispatch();
  // dispatch(fetchInitNews());
  useEffect(()=> {
    const fetchNews = async () => {
      const url = `https://api.vk.com/method/newsfeed.get?return_banned=0&access_token=${accessToken}&v=5.131`
      fetch(url).then((response) => response.json()).then((data) => setItems(data.response.items))
      // const response = await fetch(url)
      // const data = response.json()
      // return data 
    }
    fetchNews();
    console.log(items)
  }, [])

  return(
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={COLORS.primary} />
          {items === undefined ?
            <View style={styles.spinnerContainer}>
              <ActivityIndicator color={COLORS.primary} size={50}/>
            </View> :
          <View>
           <FlatList 
              data={items}
              renderItem={({item}) => <Post data={item}/>}
              keyExtractor={(item) => item.source_id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        }
          
      </SafeAreaView>
    </View>
  )
    // return (
    //   <View>
    //     <SafeAreaView>
    //       <StatusBar />
    //       
    //     </SafeAreaView>
    //   </View>
    // )
}
const styles = StyleSheet.create({
  spinnerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  }
})
export default News