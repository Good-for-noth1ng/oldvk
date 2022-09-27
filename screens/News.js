import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchInitNews } from '../redux/newsSlice';
import { COLORS } from '../constants/theme';

const News = () => {
  const dispatch = useDispatch();

  dispatch(fetchInitNews(dispatch));
    
  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={COLORS.primary} />
        <Text>news</Text>
      </SafeAreaView>
    </View>
  )
}

export default News