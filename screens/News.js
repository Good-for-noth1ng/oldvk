import { View, Text, SafeAreaView, StatusBar, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchInitNews } from '../redux/newsSlice';
import { COLORS } from '../constants/theme';

const News = () => {
  const loading = useSelector(state => state.news.loading)
  const dispatch = useDispatch();
  dispatch(fetchInitNews());
  if (!loading) {
    const items = useSelector(state => state.news.items)
  }
  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={COLORS.primary} />
        {loading ? 
          <View style={styles.spinnerContainer}>
            <ActivityIndicator color={COLORS.primary} size={50}/>
          </View> : 
          <View>
            <FlatList 
              data={items}
              
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
  }
})
export default News