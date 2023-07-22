import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator, Animated, BackHandler } from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import CustomHeader from '../components/CustomHeader'
import Comment from '../components/Comment';
import { COLORS } from '../constants/theme'
import { setProfiles, pushProfiles } from '../redux/commentsSlice';
import { setID } from '../redux/userWallSlice'
import DividerWithLine from '../components/DividerWithLine';
import TextInputField from '../components/TextInputField';
import OverlayWithButtons from '../components/OverlayWithButtons';

const CommentThread = ({navigation, route}) => {
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.user.accessToken)
  const commentsGeneralData = useSelector(state => state.comments)
  const {threadMainCommentId, ownerId, postId} = route.params
  // const threadMainCommentId = commentsGeneralData.threadMainCommentId
  // const ownerId = commentsGeneralData.ownerId
  // const postId = commentsGeneralData.postId
  // let isAuthorInfoOpen = commentsGeneralData.isAuthorInfoOpen;
  const authorName = commentsGeneralData.authorName;
  const authorImgUrl = commentsGeneralData.authorImgUrl;
  const registrationDate = commentsGeneralData.registrationDate;
  const registrationDateIsFetching = commentsGeneralData.authorInfoIsFetching;
  const authorInfoIsOpen = useRef(false)

  let getThreadUrl = `https://api.vk.com/method/wall.getComments?access_token=${accessToken}&v=5.131&count=10&comment_id=${threadMainCommentId}&extended=1&fields=photo_100&need_likes=1&owner_id=${ownerId}&post_id=${postId}&sort=asc`
  let getThreadMainCommentUrl = `https://api.vk.com/method/wall.getComment?access_token=${accessToken}&v=5.131&comment_id=${threadMainCommentId}&extended=1&fields=photo_100&owner_id=${ownerId}`
  const [isLoading, setIsLoading] = useState(true)
  const [comments, setComments] = useState(null)
  const [mainComment, setMainComment] = useState(null)
  const threadList = useRef(null)
  const offset = useRef(10)
  const currentLevelCommentsCount = useRef()
  
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)

  const slideAnimation = useRef(new Animated.Value(2000)).current

  //TODO: replace icons to buttons, purge duplicate in CommentThread screen
  const commentMenuButtonIconSize = 22
  const commentMenuButtonColor = isLightTheme ? COLORS.primary : COLORS.white
  
  const navigateToUserProfile = (userId) => {
    dispatch(setID(userId))
    navigation.push('UserProfile', { userId: userId })
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
        handleTouch: (...args) => navigateToUserProfile(...args)
      },
      {
        icon: <Ionicons name='arrow-undo-outline' color={commentMenuButtonColor} size={commentMenuButtonIconSize} />,
        text: 'Reply',
        key: uuid.v4()
      },
      {
        icon: <Feather name='users' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>,
        text: 'Liked',
        key: uuid.v4(),
        handleTouch: (...args) => navigateToUserList(...args)
      },
    ],
    [
      {
        icon: <MaterialCommunityIcons name='content-copy' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>,
        text: 'Copy',
        key: uuid.v4()
      },
      {
        icon: <Ionicons name='arrow-redo-outline' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>,
        text: 'Share',
        key: uuid.v4()
      },
      {
        icon: <Octicons name='report' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>,
        text: 'Report',
        key: uuid.v4(),
      },
    ]
  ]

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

  const fetchThreadComments = async () => {
    const threadCommentsResponse = await fetch(getThreadUrl)
    const threadMainCommentResponse = await fetch(getThreadMainCommentUrl)
    const threadCommentsData = await threadCommentsResponse.json() 
    const threadMainCommentData = await threadMainCommentResponse.json()
    const items = threadCommentsData.response.items.map(item => {
      return {...item, key: uuid.v4()}
    }) 
    setMainComment(threadMainCommentData)
    currentLevelCommentsCount.current = threadCommentsData.response.count - 10
    // console.log(threadMainCommentData.response)
    setComments(items)
    dispatch(pushProfiles([...threadCommentsData.response.profiles, threadMainCommentData.response.profiles[0]]))
    setIsLoading(false)
  }

  useEffect(() => {
    fetchThreadComments()
  }, [])

  const goBack = () => {
    navigation.goBack()
  }

  const fetchMoreComments = async () => {
    if (currentLevelCommentsCount.current > 0) {
      let fetchMoreCommentsUrl = `https://api.vk.com/method/wall.getComments?access_token=${accessToken}&count=10&offset=${offset.current}&v=5.131&comment_id=${threadMainCommentId}&extended=1&fields=photo_100&need_likes=1&owner_id=${ownerId}&post_id=${postId}&sort=asc`
      const fetchMoreCommentsResponse = await fetch(fetchMoreCommentsUrl)
      const fetchMoreCommentsData = await fetchMoreCommentsResponse.json()
      const items = fetchMoreCommentsData.response.items.map(item => {
        return {...item, key: uuid.v4()}
      })
      setComments(prevState => [...prevState, ...items])
      dispatch(pushProfiles(fetchMoreCommentsData.response.profiles))
      offset.current += 10
      currentLevelCommentsCount.current -= 10
    }
  }

  //TODO
  const renderItem = ({item}) => (
    <Comment
      commentId={item.id}
      commentDate={item.date} 
      likes={item.likes.count} 
      from_id={item.from_id} 
      commentText={item.text}
      threadComments={[]}
      navigation={navigation}
      postId={item.post_id}
      ownerId={item.owner_id}
      attachments={item?.attachments}
      is_deleted={item.deleted}
      isLightTheme={isLightTheme}
      openCommentMenu={openCommentMenu}
      //add openCommentMenu function
    />
  )
  
  const listHeader = () => (
    <>
      <DividerWithLine 
        marginT={10} 
        dividerHeight={5} 
        dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
        borderTL={4}
        borderTR={4}
      />
      <Comment
        commentId={mainComment.response.items[0].id}
        commentDate={mainComment.response.items[0].date}
        likes={mainComment.response.items[0].likes.count}
        from_id={mainComment.response.items[0].from_id}
        commentText={mainComment.response.items[0].text}
        threadComments={[]}
        isLightTheme={isLightTheme}
      />
      <DividerWithLine 
        dividerHeight={16} 
        dividerLineHeight={1} 
        dividerLineColor={isLightTheme ? COLORS.light_smoke : COLORS.secondary} 
        dividerLineWidth={300}
        dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
        linePosition={'center'}
      />
    </>
  )

  const commentSeparator = () => (
    <DividerWithLine dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark} dividerHeight={10}/>
  )

  const listBottom = () => {
    if (currentLevelCommentsCount.current > 0) {
      return (
        <>
          <View style={[styles.bottomSpinnerContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
            <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
          </View>
          <DividerWithLine dividerHeight={5} marginB={5} borderBL={5} borderBR={5}/>
        </>
      )
    } else {
      return (
        <DividerWithLine 
          dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark} 
          marginB={10} 
          dividerHeight={10} 
          borderBL={5} 
          borderBR={5}
        />
      )
    }
  }
  
  const keyExtractor = (item) => {
    return item.key
  }

  const scrollingToThreadStart = () => {
    threadList.current.scrollToIndex({index: 2, animated: true})
  }

  return (
    <SafeAreaView 
      style={[
        styles.mainContainer, 
        isLightTheme ? {backgroundColor: COLORS.light_smoke} : {backgroundColor: COLORS.background_dark}
      ]}>
      <StatusBar backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} barStyle={COLORS.white}/>
      <CustomHeader
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
        headerName={<Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Comment replies</Text>}
        isLightTheme={isLightTheme}
      />
      {
        isLoading ?
        <View style={styles.spinnerContainer}>
            <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
        </View> :
        <>
          <FlatList
            ref={threadList}
            onLayout={scrollingToThreadStart} 
            data={comments}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            style={[styles.list, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}
            ItemSeparatorComponent={commentSeparator}
            ListHeaderComponent={listHeader}
            ListFooterComponent={listBottom}
            onEndReached={fetchMoreComments}
            onEndReachedThreshold={1}
            showsVerticalScrollIndicator={false}
          />
          <TextInputField isLightTheme={isLightTheme}/>
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

export default CommentThread

const styles = StyleSheet.create({
  spinnerContainer: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainContainer: {
    flex: 1,
  },
  list: {
    marginRight: 5,
    marginLeft: 5
  },
  bottomSpinnerContainer:{
    justifyContent: 'center',
    backgroundColor: COLORS.white
  },
})