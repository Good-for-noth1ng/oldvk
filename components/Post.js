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
import PostSigner from './PostSigner' 
import { expandShadow, collapseShadow } from '../redux/globalShadowSlice'

const globalShadowHeight = Dimensions.get('window').height
const globalShadowWidth = Dimensions.get('window').width

const Post = ({data, navigation, openedPost, isLigthTheme, id, accessToken}) => {
  const dispatch = useDispatch()
  let postPhotos = []
  let postDocs = []
  let postLinks = []
  let postVideos = []

  const [dropdownMenuHeight, setDropdownMenuHeight] = useState(0)
  const [postZIndex, setPostZIndex] = useState(0)
  // const [showShadow, setShowShadow] = useState(false)
  const onMorePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setDropdownMenuHeight(160)
    setPostZIndex(400)
    // setShowShadow(true)
    dispatch(expandShadow(setDropdownMenuHeight))
  }

  const onShadowPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setDropdownMenuHeight(0)
    setPostZIndex(0)
    // setShowShadow(false)
    // setDropdownMenuHeight(0)
    dispatch(collapseShadow())
  }
  
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
        }
      }
    }
  }

  initPostData()
  
  const addPostToFave = async () => {
    const url = `https://api.vk.com/method/fave.addPost?access_token=${accessToken}&v=5.131&owner_id=${data.owner_id ? data.owner_id : data.source_id}&id=${data.id ? data.id : data.post_id}${data.access_key ? `&access_key=${data.access_key}` : ''}`
    const response = await fetch(url)
    const parsedRes = await response.json()
    if (parsedRes.response === 1) {
      ToastAndroid.show('Added to Favorite!', ToastAndroid.SHORT)
    } else {
      ToastAndroid.show('Network Error', ToastAndroid.SHORT)
    }
    onShadowPress()
  }

  const copyPostLink = async () => {
    await Clipboard.setStringAsync(`https://vk.com/wall${data.owner_id ? data.owner_id : data.source_id}_${data.id ? data.id : data.post_id}`)
    ToastAndroid.show('Copied!', ToastAndroid.SHORT)
    onShadowPress()
  }
  
  return (
    <View 
      style={[styles.postContainer, isLigthTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}, {zIndex: postZIndex}]}

    >
      <PostHeader 
        dataDate={data.date} 
        navigation={navigation}
        isLightTheme={isLigthTheme}
        onMorePress={onMorePress}
        isPinned={data.is_pinned}
        author={data.author}
        shouldShowMoreButton={openedPost}
      />
      <Animated.View 
        style={[
        styles.postDropdownMenu,
        { 
          height: dropdownMenuHeight,   
        },
        isLigthTheme ? 
        {backgroundColor: COLORS.white} :
        {backgroundColor: COLORS.very_dark_gray},
        // {transform: [{translateY: 13}]}
      ]}>
          <TouchableOpacity onPress={addPostToFave} style={styles.postDropdownMenuButton}>
            <Text style={[{fontSize: 17}, isLigthTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Add to Bookmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postDropdownMenuButton}>
            <Text style={[{fontSize: 17}, isLigthTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Not interested</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={copyPostLink} style={styles.postDropdownMenuButton}>
            <Text style={[{fontSize: 17}, isLigthTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Copy Link</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postDropdownMenuButton}>
            <Text style={[{fontSize: 17}, isLigthTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Report</Text>
          </TouchableOpacity>
      </Animated.View>
      {/* {
        showShadow ?
        <TouchableOpacity activeOpacity={1} onPress={onShadowPress} style={{zIndex: 3, width: 5000, height: 5000, zIndex: 4, position: 'absolute', bottom: 0, backgroundColor: COLORS.black}}/> : null
      } */}
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
    borderRadius: 5,
    position: 'relative'
  },
  postDropdownMenu: {
    left: '50%', 
    top: 10,
    borderRadius: 5,
    elevation: 2000, 
    position: 'absolute', 
    zIndex: 5, 
    width: 170,
  },
  postDropdownMenuButton: {
    position: 'relative', 
    zIndex: 5, 
    flex: 1, 
    elevation: 2000,
    alignItems: 'flex-start', 
    justifyContent: 'center', 
    paddingLeft: 5  
  }
})