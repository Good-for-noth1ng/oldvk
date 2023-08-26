import { StyleSheet, Text, View, TouchableOpacity, Animated, ToastAndroid, LayoutAnimation } from 'react-native'
import React from 'react'
import * as Clipboard from 'expo-clipboard'
import BottomPost from './BottomPost'
import PostHeader from './PostHeader'
import PostText from './PostText'
import PostPhotos from './PostPhotos'
import PostFiles from './PostFiles'
import PostLinks from './PostLinks'
import PostVideos from './PostVideos'
import PostDivider from './PostDivider'
// import { setItems, setOpenedPost, setScrolling } from '../redux/newsSlice'
import { useDispatch } from 'react-redux'
import { COLORS } from '../constants/theme'
import { expandShadow, collapseShadow } from '../redux/globalShadowSlice'

const Repost = ({ data, navigation, openedPost, isLightMode, id, accessToken }) => {
  let postPhotos = []
  let postDocs = []
  let postLinks = []
  let postVideos = []

  const dispatch = useDispatch()
  const isLightTheme = isLightMode
  const [dropdownMenuHeight, setDropdownMenuHeight] = React.useState(0)
  // const dropdownCollapseAnim = React.useRef(new Animated.Value(0)).current
  // const shadow = dropdownCollapseAnim.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, 500]
  // })
  // const dropdownMenuHeight = dropdownCollapseAnim.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, 160]
  // })

  const onMorePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setDropdownMenuHeight(160)
    dispatch(expandShadow(setDropdownMenuHeight))
    // Animated.timing(dropdownCollapseAnim, {
    //   toValue: 1,
    //   duration: 200, 
    //   useNativeDriver: false
    // }).start()
  }

  const onShadowPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setDropdownMenuHeight(0)
    dispatch(collapseShadow())
    // Animated.timing(dropdownCollapseAnim, {
    //   toValue: 0,
    //   duration: 200, 
    //   useNativeDriver: false
    // }).start()
  }

  const addPostToFave = async () => {
    let url = `https://api.vk.com/method/fave.addPost?access_token=${accessToken}&v=5.131&owner_id=${data.owner_id ? data.owner_id : data.source_id}&id=${data.id ? data.id : data.post_id}`
    if (data.access_key) {url += `&access_key=${data.access_key}`}
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

  if (data.attachments !== undefined && data.type === 'post') {  
    let attachments
    if (data.copy_history !== undefined) {
      attachments = data.copy_history[0].attachments
    } else {
      attachments = data.attachments
    }
    if (attachments !== undefined) {
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
    }}
  }

  const openPost = () => {
    if(openedPost) {
      navigation.push(
        'OpenPost', 
        {
          ownerId: data.owner_id ? data.owner_id : data.source_id, 
          postId: data.id ? data.id : data.post_id, 
          shouldScroll: false
        }
      )
    }
  }

  return (
    <View style={isLightTheme ? styles.postContainerLight : styles.postContainerDark}>
      <PostHeader 
        dataDate={data.date}
        navigation={navigation} 
        isLightTheme={isLightTheme} 
        isRepost={false} 
        isPinned={data.is_pinned}
        author={data.author} 
        shouldShowMoreButton={openedPost}
        onMorePress={onMorePress}
      />
      {/* <Animated.View style={{width: shadow, height: shadow, position: 'absolute', zIndex: 4,}}>
        <TouchableOpacity
          activeOpacity={1} 
          onPress={onShadowPress}
          style={{width: '100%', height: '100%'}} 
        />
      </Animated.View> */}
      <Animated.View 
        style={[
        styles.postDropdownMenu,
        { 
          height: dropdownMenuHeight, // 160   
        },
        isLightTheme ? 
        {backgroundColor: COLORS.white} :
        {backgroundColor: COLORS.very_dark_gray}
      ]}>
          <TouchableOpacity onPress={addPostToFave} style={styles.postDropdownMenuButton}>
            <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Add to Bookmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postDropdownMenuButton}>
            <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Not interested</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={copyPostLink} style={styles.postDropdownMenuButton}>
            <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Copy Link</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postDropdownMenuButton}>
            <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Report</Text>
          </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity activeOpacity={1} onPress={openPost}>
        <PostDivider dividerHeight={12} />
        {
          data.text ? (
          <>
            <PostText dataText={data.text} toOpen={openedPost} isLightTheme={isLightTheme}/>
            <PostDivider dividerHeight={6}/>
          </>
          ) : null 
        }
      </TouchableOpacity>
      <PostHeader 
        // sourceId={data.copy_history[0].owner_id !== undefined && data.copy_history[0].owner_id } 
        dataDate={data.copy_history[0].date} 
        // from_id={data.copy_history[0].from_id !== undefined && data.copy_history[0].from_id}
        navigation={navigation}
        isRepost={true} 
        isLightTheme={isLightTheme}
        author={data.copy_history[0].author}
        // onMorePress={} //TODO: add func
      />
      <TouchableOpacity activeOpacity={1} onPress={openPost}>
        <PostDivider dividerHeight={12} />
        {
          data.copy_history[0].text ? (
            <>
              <PostText dataText={data.copy_history[0].text} isLightTheme={isLightTheme} toOpen={openedPost}/>
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
        postDocs ? <PostFiles postDocs={postDocs} isLightTheme={isLightTheme}/>  : <PostDivider dividerHeight={5}/>
      }
      { 
        postLinks ? ( 
          <>
            <PostLinks postLinks={postLinks} isLightTheme={isLightTheme}/>
            <PostDivider dividerHeight={6} />
          </>
        ) 
          : null
      }
      <BottomPost 
        dataComments={data.comments} 
        dataLikes={data.likes} 
        dataReposts={data.reposts}
        openedPost={openedPost}
        navigation={navigation}
        data={data}
        isLightTheme={isLightTheme}
      />
    </View>  
  )
}

export default React.memo(Repost, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id && prevProps.isLightMode === nextProps.isLightMode
})

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