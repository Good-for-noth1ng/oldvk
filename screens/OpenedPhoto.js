import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Image, Animated, BackHandler } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import uuid from 'react-native-uuid'
import { expandShadow, collapseShadow } from '../redux/globalShadowSlice';
import CustomHeader from '../components/CustomHeader'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DividerWithLine from '../components/DividerWithLine'
import PhotoHeader from '../components/PhotoHeader'
import OpenedPostBottom from '../components/OpenedPostBottom';
import Comment from '../components/Comment'
import CommentsOverlay from '../components/CommentsOverlay';
import GlobalShadow from '../components/GlobalShadow';
import { COLORS } from '../constants/theme'

const OpenedPhoto = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const isGlobalShadowExpanded = useSelector(state => state.globalShadow.isOpen)
  const { ownerId, photoUrl, date, author, width, height, text, photoId, userId } = route.params
  console.log(photoId)
  // const [isLoading, setIsLoading] = React.useState(false)
  const [comments, setComments] = React.useState([])
  const count = 20
  const offset = React.useRef(0)
  const currentLevelCommentsCount = React.useRef()

  const slideAnimation = React.useRef(new Animated.Value(2000)).current
  const authorInfoIsOpen = React.useRef(false)

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (authorInfoIsOpen.current === true) {
          closeCommentMenu()
          return true
        }
        return false
      }
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () => subscription.remove()
    }, [authorInfoIsOpen.current])
  )

  React.useEffect(() => {
    if (isGlobalShadowExpanded == false) {
      closeCommentMenu()
    }
  }, [isGlobalShadowExpanded])

  const closeCommentMenu = () => {
    authorInfoIsOpen.current = false
    dispatch(collapseShadow())
    Animated.timing(slideAnimation, {
      toValue: 2000,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  const openCommentMenu = () => {
    authorInfoIsOpen.current = true 
    dispatch(expandShadow({dropdownType: 'none'}))
    Animated.timing(slideAnimation, {
      toValue: 100,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  const fetchComments = async () => {
    const url = `https://api.vk.com/method/photos.getComments?access_token=${accessToken}&v=5.131&photo_id=${photoId}&need_likes=1&owner_id=${ownerId}&count=${count}&sort=asc&offset=${offset.current}&fields=photo_100&extended=1`
    const res = await fetch(url)
    const commentsData = await res.json()
    console.log(commentsData)
    if (commentsData.error) {
      //permission denied
      if (commentsData.error.error_code === 7) {
        currentLevelCommentsCount.current = 0
        offset.current = 0
        setComments(null)
      }
    } else {
      const items = commentsData.response.items.map(item => {
        const key = uuid.v4()
        let threadItems = []
        if (item?.thread?.count > 0) {
          threadItems = item.thread.items.map(item => {
            const key = uuid.v4()
            let author = commentsData.response.profiles.find(profile => profile.id === item.from_id)
            if (author === undefined) {
              author = commentsData.response.groups.find(group => group.id === (-1 * item.from_id))
            }
            return {
              ...item,
              key,
              author,
            }
          })
        }
        const thread = {
          ...item.thread,
          items: threadItems
        }
        let author = commentsData.response.profiles.find(profile => profile.id === item.from_id)
        if (author === undefined) {
          author = commentsData.response.groups.find(group => group.id === (-1 * item.from_id))
        }
        return {
          ...item, 
          key,
          author,
          thread,
        }
      })
      if (commentsData.response.items.length > 0) {
        setComments(items)
      } else {
        setComments(null)
      }
      currentLevelCommentsCount.current = commentsData.response.count
      offset.current += 10
    }
    // setPost(findPostAuthor(parsedPostResponse.response.items[0], parsedPostResponse.response.profiles, parsedPostResponse.response.groups))  
  }

  React.useEffect(() => {
    fetchComments()
  }, [])
  
  const listHeader = () => {
    return (
      <>
        <DividerWithLine dividerHeight={10} dividerColor={isLightTheme ? COLORS.light_smoke : COLORS.background_dark}/>
        <DividerWithLine dividerHeight={3} borderTL={5} borderTR={5} dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}/>
        <PhotoHeader 
          ownerId={ownerId}
          date={date}
          accessToken={accessToken}
          isLightTheme={isLightTheme}
          navigation={navigation}
          name={author.name ? author.name : `${author.first_name} ${author.last_name}`}
          imgUrl={author.photo_100}
          isFriend={false}
          isMember={false}
        />
        <View style={[{paddingLeft: 5, paddingRight: 5}, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
          <Image source={{uri: photoUrl}} style={{width: width, height: height, maxWidth: '100%',}}/>
        </View>
        {
          text ?
          <>
            <View style={[{padding: 5}, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>{text}</Text>
            </View>
          </> : 
          null
        }
        {
          text && currentLevelCommentsCount.current ?
          <DividerWithLine 
              dividerLineHeight={1} 
              dividerLineWidth={'93%'} 
              dividerLineColor={COLORS.light_smoke} 
              dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
          /> :
          null
        }
        {/* {
          currentLevelCommentsCount.current >= 0 ?
          <>
            <View style={[{flexDirection: 'row', padding: 5, gap: 5}, isLightTheme? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
              <Text style={styles.commentCount}>{currentLevelCommentsCount.current}</Text>
              <Text style={styles.commentCount}>{currentLevelCommentsCount.current !== 1 ? 'COMMENTS' : 'COMMENT'}</Text>
            </View>
          </> : null
        } */}
      </>
    )
  }
  const renderItem = ({item}) => {
    // console.log(item)
    return (
      <Comment 
        commentId={item.id}
        commentDate={item.date} 
        likes={item?.likes?.count} 
        from_id={item.from_id} 
        commentText={item.text}
        threadComments={[]}
        threadCount={item.thread.count}
        navigation={navigation}
        // postId={postId}
        ownerId={ownerId}
        attachments={item?.attachments}
        is_deleted={item.deleted}
        isLightTheme={isLightTheme}
        openCommentMenu={openCommentMenu}
        author={item.author}
      />
    )
  }

  const commentSeparator = () => (
    <DividerWithLine dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark} dividerHeight={12}/>
  )

  const footer = () => {
    return (
      <>
        <DividerWithLine dividerHeight={10} borderBL={5} borderBR={5} dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}/>
        <DividerWithLine dividerHeight={10} dividerColor={isLightTheme ? COLORS.light_smoke : COLORS.background_dark}/>
      </>
      
    )
  }
  const goBack = () => {
    navigation.goBack()
  }
  return (
    <SafeAreaView style={[{flex: 1, justifyContent: 'flex-start' }, isLightTheme ? {backgroundColor: COLORS.light_smoke} : {backgroundColor: COLORS.background_dark}]}>
      <CustomHeader 
        isLightTheme={isLightTheme}
        headerName={<Text style={styles.headerTextStyle}>Photo</Text>}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
      />
      <FlatList
        data={comments}
        style={[styles.list]}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={footer}
        ListEmptyComponent={
          comments !== null &&
          <View style={[{paddingTop: 10}, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
            <ActivityIndicator size={40} color={isLightTheme ? COLORS.primary : COLORS.white}/>
          </View>
        }
        ItemSeparatorComponent={commentSeparator}
      />
      <CommentsOverlay 
        slideAnimation={slideAnimation}
        isLightTheme={isLightTheme}
        navigation={navigation}
      />
      <GlobalShadow />
    </SafeAreaView>
  )
}

export default OpenedPhoto

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 5, 
    marginRight: 5, 
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    borderRadius: 5
  },
  list: {
    marginLeft: 5,
    marginRight: 5,
  },
  commentCount: {
    fontSize: 15,
    color: COLORS.secondary,
  }
})