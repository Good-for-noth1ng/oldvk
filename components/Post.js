import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
import { useState } from 'react'
import BottomPost from './BottomPost'
import PostHeader from './PostHeader'
import PostText from './PostText'
import PostPhotos from './PostPhotos'
import PostFiles from './PostFiles'
import PostLinks from './PostLinks'
import PostVideos from './PostVideos'

const Post = ({data}) => {
  let postPhotos = []
  let postDocs = []
  let postLinks = []
  let postVideos = []
  const type = data.type
  if (type === 'wall_photo') {
    for (let i = 0; i < data.photos.count; i++) {
      postPhotos.push(data.photos.items[i])
    }
  }
  if (data.attachments !== undefined && type === 'post') {
    const attachments = data.attachments
    for (let i = 0; i < attachments.length; i++) {
      if (attachments[i].type === 'photo') {
        postPhotos.push(attachments[i].photo)
      } else if (attachments[i].type === 'doc') {
        postDocs.push(attachments[i].doc)
      } else if(attachments[i].type === 'link') {
        postLinks.push(attachments[i].link)
      } else if (attachments[i].type === 'video') {
        postVideos.push(attachments[i].video)
      }
    }
  }
  if (type === 'wall_photo') {
    return (
      <View style={styles.postContainer}>
        <PostHeader data={data}/>
        <PostPhotos postPhotos={postPhotos}/>
        <BottomPost data={data}/>
    </View>  
    )
  }
  // if (data.copy_history !== undefined) {
  //   const attachments = data.copy_history[0].attachments
  //   for (let i = 0; i < attachments.length; i++) {
  //     if (attachments[i].type === 'photo') {
  //       postPhotos.push(attachments[i].photo)
  //     } else if (attachments[i].type === 'doc') {
  //       postDocs.push(attachments[i].doc)
  //     } else if(attachments[i].type === 'link') {
  //       postLinks.push(attachments[i].link)
  //     } else if (attachments[i].type === 'video') {
  //       postVideos.push(attachments[i].video)
  //     }
  //   }
  //   return (
  //     <View style={styles.postContainer}>
  //       <PostHeader data={data.copy_history[0]}/>
  //       <PostText data={data.copy_history[0]}/>
  //       <PostPhotos postPhotos={postPhotos}/>
  //       {/* <PostVideos postVideos={postVideos}/> */}
  //       <PostFiles postDocs={postDocs}/>
  //       <PostLinks postLinks={postLinks}/>
  //       <BottomPost data={data.copy_history[0]}/>
  //     </View>  
  //   )
  // }
  return (
    <View style={styles.postContainer}>
      <PostHeader data={data}/>
      <PostText data={data}/>
      <PostPhotos postPhotos={postPhotos}/>
      {/* <PostVideos postVideos={postVideos}/> */}
      <PostFiles postDocs={postDocs}/>
      <PostLinks postLinks={postLinks}/>
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