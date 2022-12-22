import { StyleSheet, FlatList } from 'react-native'
import React, {useEffect} from 'react'
import Post from '../components/Post'
import { useSelector } from 'react-redux'
import { COLORS } from '../constants/theme'

const OpenPost = ({navigation}) => {
  const data = useSelector(state => state.news.openedPost) 
  const renderItem = ({item}) => (
    <Post data={item} navigation={navigation} toOpen={false}/>
  )
  return (
    <FlatList 
      data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      initialNumToRender={1}
    />
  )
}

export default OpenPost

const styles = StyleSheet.create({})