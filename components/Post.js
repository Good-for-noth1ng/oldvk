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
  
  if (data.attachments !== undefined && type === 'post') {
    let attachments
    if (data.copy_history !== undefined) {
      attachments = data.copy_history[0].attachments
    } else {
      attachments = data.attachments
    }
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
    return null
  }

  if (data.copy_history !== undefined) {
    return (
      <View style={styles.postContainer}>
        <PostHeader sourceId={data.source_id} dataDate={data.date}/>
        <PostText dataText={data.text}/>
        <PostHeader sourceId={data.copy_history[0].owner_id} dataDate={data.copy_history[0].date}/>
        <PostText dataText={data.copy_history[0].text}/>
        <PostPhotos postPhotos={postPhotos}/>
        {/* <PostVideos postVideos={postVideos}/> */}
        <PostFiles postDocs={postDocs}/>
        <PostLinks postLinks={postLinks}/>
        <BottomPost 
          dataComments={data.copy_history[0].comments} 
          dataLikes={data.copy_history[0].likes} 
          dataReposts={data.copy_history[0].reposts}
        />
      </View>  
    )
  }
  
  return (
    <View style={styles.postContainer}>
      <PostHeader sourceId={data.source_id} dataDate={data.date}/>
      <PostText dataText={data.text}/>
      <PostPhotos postPhotos={postPhotos}/>
      {/* <PostVideos postVideos={postVideos}/> */}
      <PostFiles postDocs={postDocs}/>
      <PostLinks postLinks={postLinks}/>
      <BottomPost dataComments={data.comments} dataLikes={data.likes} dataReposts={data.reposts}/>
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