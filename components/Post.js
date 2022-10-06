import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
import { useState } from 'react'
import BottomPost from './BottomPost'
import PostHeader from './PostHeader'
import PostText from './PostText'
import PostPhotos from './PostPhotos'
import PostPhotos from './PostPhotos'
import PostFiles from './PostFiles'
import PostLinks from './PostLinks'
import PostVideos from './PostVideos'

const Post = ({data}) => {
  return (
    <View style={styles.postContainer}>
      <PostHeader data={data}/>
      <PostText data={data}/>
      <PostPhotos data={data}/>
      <BottomPost data={data}/>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  postContainer: {
    margin: 4,
    padding: 10,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  
})