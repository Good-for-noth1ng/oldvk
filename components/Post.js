import { StyleSheet, Text, View, Image, InteractionManager, Animated, ToastAndroid , LayoutAnimation, Dimensions, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import * as Clipboard from 'expo-clipboard'
import { COLORS } from '../constants/theme'
import { useSelector, useDispatch } from 'react-redux'
import BottomPost from './BottomPost'
import PostHeader from './PostHeader'
import PostText from './PostText'
import PostPhotos from './PostPhotos'
import PostFiles from './PostFiles'
import PostLinks from './PostLinks'
import PostVideos from './PostVideos'
import PostDivider from './PostDivider'
import PostPoll from './PostPoll'
import PostSigner from './PostSigner' 
import { expandShadow, collapseShadow } from '../redux/globalShadowSlice'

const globalShadowHeight = Dimensions.get('window').height
const globalShadowWidth = Dimensions.get('window').width

const Post = ({data, navigation, openedPost, isLigthTheme, id, accessToken, fromNewsfeed}) => {
  let postPhotos = []
  let postDocs = []
  let postLinks = []
  let postVideos = []
  let postPoll
  const [showNotInterested, setShowNotInterested] = React.useState(false)
  
  const openPost = () => {
    if (openedPost) {
      navigation.push('OpenPost', {ownerId: data.owner_id ? data.owner_id : data.source_id, postId: data.id ? data.id : data.post_id, shouldScroll: false}) // source_id, post_id
    }
  }
  
  const initPostData = () => {
    if (data.attachments !== undefined && data.post_type === 'post') {  
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
          // postPhotos.push(attachments[i].video)
        } else if (attachments[i].type === 'poll') {
          postPoll = attachments[i].poll
        }
      }
    }
  }

  initPostData()
  
  return (
    <View 
      style={[
        styles.postContainer, 
        isLigthTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark},
        openedPost && {borderRadius: 5}
      ]}

    >
      <PostHeader 
        dataDate={data.date} 
        navigation={navigation}
        isLightTheme={isLigthTheme}
        isPinned={data.is_pinned}
        author={data.author}
        shouldShowMoreButton={openedPost}
        data={data}
        fromNewsfeed={fromNewsfeed}
      />
      <TouchableOpacity activeOpacity={1} onPress={openPost}>
        <PostDivider dividerHeight={12}/>
        {
          data.text ? (
            <>
              <PostText dataText={data.text} toOpen={openedPost} isLightTheme={isLigthTheme}/>
              <PostDivider dividerHeight={6}/>
            </>
          ) : null
        }
      </TouchableOpacity>
      {
        postPoll ?
          <>
            <PostPoll poll={postPoll} isLightTheme={isLigthTheme} accessToken={accessToken}/>
            <PostDivider dividerHeight={5}/>
          </>
          : null
      }
      { 
        postPhotos ? (
          <>
            <PostPhotos postPhotos={postPhotos} navigation={navigation} ownerId={data.owner_id} date={data.date} author={data.author}/>
            {!postVideos && <PostDivider dividerHeight={5}/>}   
          </>
        ) : null
      }
      {
        postVideos ? (
          <>
            <PostVideos postVideos={postVideos} navigation={navigation}/>
            <PostDivider dividerHeight={5}/>  
          </>
        ) : null
      }
      {
        postDocs ? <PostFiles postDocs={postDocs} isLightTheme={isLigthTheme}/> : <PostDivider dividerHeight={5}/>
      }
      {
        postLinks ? ( 
          <>
            <PostLinks postLinks={postLinks} isLightTheme={isLigthTheme}/>
            <PostDivider dividerHeight={6} />
          </>
        ) : null
      }
      {
        data.signer ? 
        <PostSigner author={data.signer} navigation={navigation}/> :
        null
      }
      <BottomPost 
        dataComments={data.comments} 
        dataLikes={data.likes} 
        dataReposts={data.reposts} 
        openedPost={openedPost}
        data={data}
        navigation={navigation}
        isLightTheme={isLigthTheme}
        accessToken={accessToken}
      />
    </View>
  )
}
//TODO: fix memoization
// export default memo(Post, compareStates)
export default React.memo(Post, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id && prevProps.isLigthTheme === nextProps.isLigthTheme
})

const styles = StyleSheet.create({
  postContainer: {
    padding: 10,
    marginTop: 5,
    // borderRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    position: 'relative'
  },
})