import { StyleSheet, Text, View, TouchableOpacity, Image, InteractionManager, Animated, ToastAndroid } from 'react-native'
import React, { useCallback, memo } from 'react'
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
import { setOpenedPost } from '../redux/newsSlice'
import { setScrolling } from '../redux/newsSlice'
import PostSigner from './PostSigner' 

const Post = ({data, navigation, openedPost, isCommunityContent, isProfileContent, isLigthTheme, id}) => {
  const dispatch = useDispatch();
  let postPhotos = []
  let postDocs = []
  let postLinks = []
  let postVideos = []
  const signerID = data.signer_id
  

  const dropdownCollapseAnim = React.useRef(new Animated.Value(0)).current
  const shadow = dropdownCollapseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500]
  })
  const dropdownMenuHeight = dropdownCollapseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 160]
  })

  const onMorePress = () => {
    Animated.timing(dropdownCollapseAnim, {
      toValue: 1,
      duration: 200, 
      useNativeDriver: false
    }).start()
  }

  const onShadowPress = () => {
    Animated.timing(dropdownCollapseAnim, {
      toValue: 0,
      duration: 200, 
      useNativeDriver: false
    }).start()
  }
  // console.log(data)
  const openPost = () => {
    if (openedPost) {
      dispatch(setOpenedPost(data))
      dispatch(setScrolling(false))
      navigation.push('OpenPost')
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
          // postPhotos.push(attachments[i].video)
        }
      }
    }
  }

  initPostData()
  
  const addPostToFave = () => {
    ToastAndroid.show('Added to Favorite!', ToastAndroid.SHORT)
    onShadowPress()
  }

  const copyPostLink = async () => {
    await Clipboard.setStringAsync(`https://vk.com/wall${data.owner_id}_${data.id}`)
    ToastAndroid.show('Copied!', ToastAndroid.SHORT)
    onShadowPress()
  }
  // InteractionManager.addListener('')
  return (
    <View style={isLigthTheme ? styles.postContainerLight : styles.postContainerDark}>
      <PostHeader 
        sourceId={data.source_id}
        from_id={data.from_id} 
        dataDate={data.date} 
        isCommunityContent={isCommunityContent} 
        isProfileContent={isProfileContent}
        navigation={navigation}
        isLightTheme={isLigthTheme}
        onMorePress={onMorePress}
        isPinned={data.is_pinned}
      />
      <Animated.View style={{width: shadow, height: shadow, position: 'absolute', zIndex: 4,}}>
        <TouchableOpacity
          activeOpacity={1} 
          onPress={onShadowPress}
          style={{width: '100%', height: '100%'}} 
        />
      </Animated.View>
      <Animated.View 
        style={[
        styles.postDropdownMenu,
        { 
          height: dropdownMenuHeight, // 160   
        },
        isLigthTheme ? 
        {backgroundColor: COLORS.white} :
        {backgroundColor: COLORS.very_dark_gray}
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
        signerID ? 
        <PostSigner signerID={signerID} navigation={navigation}/> :
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
      />
    </View>
  )
}
// export default memo(Post, compareStates)
export default memo(Post, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id && prevProps.isLigthTheme === nextProps.isLigthTheme
})

const styles = StyleSheet.create({
  postContainerLight: {
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  postContainerDark: {
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: COLORS.primary_dark,
  },
  postDropdownMenu: {
    left: '50%', 
    top: 10,
    borderRadius: 5,
    elevation: 4, 
    position: 'absolute', 
    zIndex: 5, 
    width: 170,
  },
  postDropdownMenuButton: {
    position: 'relative', 
    zIndex: 4, 
    flex: 1, 
    alignItems: 'flex-start', 
    justifyContent: 'center', 
    paddingLeft: 5  
  }
})