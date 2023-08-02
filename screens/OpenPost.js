import { StyleSheet, View, ActivityIndicator, Text, StatusBar, TouchableOpacity, SafeAreaView, Animated, BackHandler, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useCallback, memo, useRef } from 'react'
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import uuid from 'react-native-uuid'
import * as Clipboard from 'expo-clipboard'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import { setProfiles, closeAuthorInfo, pushProfiles, setGroups, pushGroups } from '../redux/commentsSlice'
import { setID } from '../redux/userWallSlice'
import Post from '../components/Post'
import Comment from '../components/Comment'
import OpenedPostBottom from '../components/OpenedPostBottom'
import DividerWithLine from '../components/DividerWithLine'
import CustomHeader from '../components/CustomHeader'
import Repost from '../components/Repost'
import TextInputField from '../components/TextInputField'
import OverlayWithButtons from '../components/OverlayWithButtons'
import { getTimeDate } from '../utils/date'
import { COLORS } from '../constants/theme'
import { findPostAuthor } from '../utils/dataPreparationForComponents';

const OpenPost = ({navigation, route}) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const [isLoading, setIsLoading] = useState(true);
  
  const [post, setPost] = useState()
  const { ownerId, postId, shouldScroll } = route.params
   
  const accessToken = useSelector(state => state.user.accessToken);
  const getPostUrl = `https://api.vk.com/method/wall.getById?access_token=${accessToken}&v=5.131&posts=${ownerId}_${postId}&extended=1&fields=photo_100,name`
  const commentsGeneralData = useSelector(state => state.comments); 
  
  const authorName = commentsGeneralData.authorName;
  const authorImgUrl = commentsGeneralData.authorImgUrl;
  const registrationDate = commentsGeneralData.registrationDate;
  const registrationDateIsFetching = commentsGeneralData.authorInfoIsFetching;
  const authorInfoIsOpen = useRef(false)
  
  // const shouldScroll = useSelector(state => state.news.scrollToComments)
  const [comments, setComments] = useState(null);
  const commentsList = useRef()
  const currentLevelCommentsCount = useRef()
  const offset = useRef(0)
  
  useFocusEffect(
    useCallback(() => {
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

  const slideAnimation = useRef(new Animated.Value(2000)).current
  
  const closeCommentMenu = () => {
    authorInfoIsOpen.current = false
    Animated.timing(slideAnimation, {
      toValue: 2000,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  const openCommentMenu = () => {
    authorInfoIsOpen.current = true
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  //TODO: replace icons to buttons, purge duplicate in CommentThread screen
  const commentMenuButtonIconSize = 22
  const commentMenuButtonColor = isLightTheme ? COLORS.primary : COLORS.white
  
  const copyCommentText = async (commentText) => {
    await Clipboard.setStringAsync(commentText)
    ToastAndroid.show('Copied!', ToastAndroid.SHORT)
  }

  const navigateToUserProfile = (userId) => {
    // dispatch(setID(userId))
    navigation.push('UserProfile', {userId})
  }

  const navigateToUserList = () => {
    navigation.push('ReactedUsersList')
  }

  const commentMenuButtons = [
    [
      {
        icon: <Feather name='user' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>,
        text: 'Profile',
        key: uuid.v4(),
        type: 'profile',
        handleTouch: (...args) => navigateToUserProfile(...args)
      },
      {
        icon: <Ionicons name='arrow-undo-outline' color={commentMenuButtonColor} size={commentMenuButtonIconSize} />,
        text: 'Reply',
        key: uuid.v4(),
        type: 'reply'
      },
      {
        icon: <Feather name='users' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>,
        text: 'Liked',
        key: uuid.v4(),
        type: 'liked',
        handleTouch: (...args) => navigateToUserList(...args)
      },
    ],
    [
      {
        icon: <MaterialCommunityIcons name='content-copy' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>,
        text: 'Copy',
        key: uuid.v4(),
        type: 'copy',
        handleTouch: (...args) => copyCommentText(...args)
      },
      {
        icon: <Ionicons name='arrow-redo-outline' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>,
        text: 'Share',
        key: uuid.v4(),
        type: 'share',
      },
      {
        icon: <Octicons name='report' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>,
        text: 'Report',
        key: uuid.v4(),
        type: 'report'
      },
    ]
  ]

  const commentsUrl = `https://api.vk.com/method/wall.getComments?access_token=${accessToken}&v=5.131&need_likes=1&owner_id=${ownerId}&count=10&post_id=${postId}&sort=asc&offset=${offset.current}&thread_items_count=2&fields=photo_100&extended=1`
  
  const fetchComments = async () => {
    //check access to post comments 203977193 1555
    const commentsResponse = await fetch(commentsUrl)
    const postResponse = await fetch(getPostUrl)
    const commentsData = await commentsResponse.json()
    const parsedPostResponse = await postResponse.json()
    if (commentsData.error !== undefined) {
      //access to post comments denied
      if (commentsData.error.error_code === 212) {
        setPost(findPostAuthor(parsedPostResponse.response.items[0], parsedPostResponse.response.profiles, parsedPostResponse.response.groups))
        setComments(null)
        currentLevelCommentsCount.current = -1
        setIsLoading(false)
      }
    } else {
      const items = commentsData.response.items.map(item => {
        const key = uuid.v4()
        let threadItems = []
        if (item.thread.count > 0) {
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
      setPost(findPostAuthor(parsedPostResponse.response.items[0], parsedPostResponse.response.profiles, parsedPostResponse.response.groups))
      setComments(items)
      currentLevelCommentsCount.current = commentsData.response.current_level_count - 10
      offset.current += 10
      setIsLoading(false)
    }
  }
  
  const fetchMoreComments = async () => {
    if(currentLevelCommentsCount.current > 0) {
      const fetchMoreCommentsResponse = await fetch(commentsUrl)
      const fetchMoreCommentsData = await fetchMoreCommentsResponse.json()
      const items = fetchMoreCommentsData.response.items.map(item => {
        const key = uuid.v4()
        let threadItems = []
        if (item.thread.count > 0) {
          threadItems = item.thread.items.map(item => {
            const key = uuid.v4()
            let author = fetchMoreCommentsData.response.profiles.find(profile => profile.id === item.from_id)
            if (author === undefined) {
              author = fetchMoreCommentsData.response.groups.find(group => group.id === (-1 * item.from_id))
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
        let author = fetchMoreCommentsData.response.profiles.find(profile => profile.id === item.from_id)
        if (author === undefined) {
          author = fetchMoreCommentsData.response.groups.find(group => group.id === (-1 * item.from_id))
        }
        return {
          ...item,
          key,
          author,
          thread
        }
      }) 
      currentLevelCommentsCount.current -= 10
      offset.current += 10
      setComments(prevState => prevState.concat(items))
    }
  }

  useEffect(() => { 
    fetchComments();
  }, []);

  const renderComment = ({item}) => (
    <Comment 
      commentId={item.id}
      commentDate={item.date} 
      likes={item?.likes?.count} 
      from_id={item.from_id} 
      commentText={item.text}
      threadComments={item.thread.items}
      threadCount={item.thread.count}
      navigation={navigation}
      postId={postId}
      ownerId={ownerId}
      attachments={item?.attachments}
      is_deleted={item.deleted}
      isLightTheme={isLightTheme}
      openCommentMenu={openCommentMenu}
      author={item.author}
    />
  )

  const commentSeparator = () => (
    <DividerWithLine dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark} dividerHeight={12}/>
  )

  const handleNavigationBack = () => {
    navigation.pop()
  }

  const listHeader = () => {
    // console.log(data)
    // console.log(data.likes)
    console.log(ownerId, postId)
    if (post.copy_history === undefined) {
      return (
        <>
          <Post 
            data={post} 
            navigation={navigation} 
            openedPost={false} 
            isLigthTheme={isLightTheme}
            id={post.key}
            accessToken={accessToken}
          />
          <OpenedPostBottom 
            likes={post?.likes?.count} 
            reposts={post?.reposts?.count} 
            views={post?.views?.count} 
            comments={post?.comments?.count}
            isLightTheme={isLightTheme}
          />
        </>
      )
    }
    return (
      <>
        <Repost 
          data={post} 
          openedPost={false} 
          navigation={navigation} 
          isLightMode={isLightTheme} 
          id={post.key}
          accessToken={accessToken}
        />
        <OpenedPostBottom 
          likes={post?.likes?.count} 
          reposts={post?.reposts?.count} 
          views={post?.views?.count} 
          comments={post?.comments?.count}
          isLightTheme={isLightTheme}
        />
      </>
    )
  }

  const listFooter = () => {
    if (currentLevelCommentsCount.current > 0) {
      return (
        <>
          <View style={isLightTheme ? styles.bottomSpinnerContainerLight : styles.bottomSpinnerContainerDark}>
            <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={40}/>
          </View>
          <DividerWithLine 
            dividerHeight={5} 
            marginB={5} 
            borderBL={5} 
            borderBR={5}
            dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
          />
        </>
      )
    } else {
      return (
        <DividerWithLine 
          dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark} 
          dividerHeight={5} 
          marginB={5} 
          borderBL={5} 
          borderBR={5}/>
        )
    }
  }

  // const handleClosingCommentAuthorInfo = () => {
  //   dispatch(closeAuthorInfo());
  // }

  const scrollingToComments = () => {
    if(shouldScroll) {
      commentsList.current.scrollToIndex({index: 0, animated: true,viewPosition: 0.1})
    }
  }

  const keyExtractor = (item) => {
    return item.key
  }
  
  return (
    <SafeAreaView 
      style={[
        styles.openPostContainer, 
        isLightTheme ? {backgroundColor: COLORS.light_smoke} : {backgroundColor: COLORS.background_dark}
      ]}
    >
      <StatusBar barStyle={COLORS.white} backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark}/>
      <CustomHeader 
        headerName={<Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Post</Text>}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={handleNavigationBack}
        isLightTheme={isLightTheme}
      />
      {
        isLoading ? 
        <View style={styles.activityContainer}>
          <ActivityIndicator size={50} color={isLightTheme ? COLORS.primary : COLORS.white}/>
        </View> :
        <>
          <FlatList
            onLayout={scrollingToComments}
            ref={commentsList}
            ListHeaderComponent={listHeader}
            data={comments} 
            renderItem={renderComment}      
            ItemSeparatorComponent={commentSeparator}
            onEndReached={fetchMoreComments}
            ListFooterComponent={listFooter}
            onEndReachedThreshold={0.8}
            style={[styles.list, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
          />
          { comments ? <TextInputField isLightTheme={isLightTheme}/> : null}
          <OverlayWithButtons 
            slideAnimation={slideAnimation}
            handleShadowTouch={closeCommentMenu}
            isLightTheme={isLightTheme}
            buttons={commentMenuButtons}
            registrationDate={registrationDate}
            authorImgUrl={authorImgUrl}
            authorName={authorName}
            navigation={navigation}
            registrationDateIsFetching={registrationDateIsFetching}
          />
        </>
      }
    </SafeAreaView>
  )
}

export default OpenPost

const styles = StyleSheet.create({
  activityContainer: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    marginLeft: 5,
    marginRight: 5,
  },
  modalContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  modal: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  modalViewContainer: {
    width: '100%', 
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  modalViewLight: {
    width: 250, 
    height: 250, 
    backgroundColor: COLORS.white, 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    shadowColor: COLORS.black,
    borderRadius: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    elevation: 13,
    shadowRadius: 4,
  },
  modalViewDark: {
    width: 250, 
    height: 250, 
    backgroundColor: COLORS.very_dark_gray, 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    shadowColor: COLORS.black,
    borderRadius: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    elevation: 13,
    shadowRadius: 4,
  },
  commentInfoHeader: {
    width: '100%', 
    height: 40, 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    alignItems: 'center',
  },
  crossButton: {
    width: 30, 
    height: 30,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameAvatarContainer: {
    width: 230,
    display: 'flex',
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInfo: {
    width: 50, 
    height: 50, 
    borderRadius: 100, 
    marginRight: 5,
  },
  nameInfoLight: {
    fontSize: 16, 
    fontWeight: '700', 
    color: COLORS.black, 
    marginLeft: 5,
  },
  nameInfoDark: {
    fontSize: 16, 
    fontWeight: '700', 
    color: COLORS.white, 
    marginLeft: 5,
  },
  registredContainer: {
    marginTop: 40
  },
  registredText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondary
  },
  openPostContainer: {
    flex: 1,
    // backgroundColor: COLORS.light_smoke,
  },
  // openPostContainerDark: {
  //   flex: 1,
  //   backgroundColor: COLORS.background_dark,
  // },
  bottomSpinnerContainerLight: {
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  bottomSpinnerContainerDark: {
    justifyContent: 'center',
    backgroundColor: COLORS.primary_dark, 
  }
})