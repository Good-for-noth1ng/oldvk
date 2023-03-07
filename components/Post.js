import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, memo } from 'react'
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
import { setOpenedPost } from '../redux/newsSlice'
import { setScrolling } from '../redux/newsSlice'

const Post = ({data, navigation, openedPost, isCommunityContent, isProfileContent, isLigthTheme}) => {
  const dispatch = useDispatch();
  let postPhotos = []
  let postDocs = []
  let postLinks = []
  let postVideos = []
  
  const openPost = () => {
    if (openedPost) {
      dispatch(setOpenedPost(data))
      dispatch(setScrolling(false))
      navigation.navigate('OpenPost')
    }
  }
  // console.log(data.type)
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
        }
      }
    }
  }

  initPostData()
  
  return (
    <View style={!isLigthTheme ? styles.postContainerLight : styles.postContainerDark}>
      <PostHeader 
        sourceId={data.source_id}
        from_id={data.from_id} 
        dataDate={data.date} 
        isCommunityContent={isCommunityContent} 
        isProfileContent={isProfileContent}
        navigation={navigation}
        isLightTheme={isLigthTheme}
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
        postPhotos ? (
          <>
            <PostPhotos postPhotos={postPhotos}/>
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
      <BottomPost 
        dataComments={data.comments} 
        dataLikes={data.likes} 
        dataReposts={data.reposts} 
        openedPost={openedPost}
        data={data}
        navigation={navigation}
        isLightTheme={isLigthTheme}
      />
    </View>
  )
}

const compareStates = (prevState, nextState) => {
  return prevState.key === nextState.key
}
export default memo(Post, compareStates)

const styles = StyleSheet.create({
  postContainerLight: {
    padding: 10,
    marginTop: 5,
    borderRadius: 3,
    backgroundColor: COLORS.white,
  },
  postContainerDark: {
    padding: 10,
    marginTop: 5,
    borderRadius: 3,
    backgroundColor: COLORS.primary_dark,
  }
})