import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchInitNews } from '../redux/postSlice';

const News = () => {
  const dispatch = useDispatch()

  
    dispatch(fetchInitNews())
  

  return (
    <View>
      <SafeAreaView>
        <StatusBar />
        <Text>news</Text>
      </SafeAreaView>
    </View>
  )
}

export default News