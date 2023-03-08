import { StyleSheet, FlatList, View, ActivityIndicator, Text, Modal, StatusBar, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useCallback, memo, useRef } from 'react'
import Post from '../components/Post'
import { useSelector, useDispatch } from 'react-redux'
import uuid from 'react-native-uuid'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../constants/theme'
import Comment from '../components/Comment'
import { setProfiles, closeAuthorInfo, pushProfiles } from '../redux/commentsSlice'
import OpenedPostBottom from '../components/OpenedPostBottom'
import DividerWithLine from '../components/DividerWithLine'
import { getTimeDate } from '../utils/date'
import CustomHeader from '../components/CustomHeader'
import Repost from '../components/Repost'
import TextInputField from '../components/TextInputField'
const OpenPost = ({navigation}) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()
  const data = useSelector(state => state.news.openedPost) 
  const accessToken = useSelector(state => state.user.accessToken);
  let isAuthorInfoOpen = useSelector(state => state.comments.isAuthorInfoOpen);
  const authorName = useSelector(state => state.comments.authorName)
  const authorImgUrl = useSelector(state => state.comments.authorImgUrl)
  const regestrationDate = useSelector(state => state.comments.registrationDate)
  const registrationDateIsFetching = useSelector(state => state.comments.authorInfoIsFetching)
  const shouldScroll = useSelector(state => state.news.scrollToComments)
  const [comments, setComments] = useState(null);
  const commentsList = useRef()
  const currentLevelCommentsCount = useRef()
  const offset = useRef(0)
  // const scrollToComments = () => {}
  let commentsUrl
  if (data.source_id !== undefined && data.post_id !== undefined) {
    commentsUrl = `https://api.vk.com/method/wall.getComments?access_token=${accessToken}&v=5.131&need_likes=1&owner_id=${data.source_id}&count=10&post_id=${data.post_id}&sort=asc&offset=${offset.current}&thread_items_count=2&fields=photo_100&extended=1`;
  } else {
    commentsUrl = `https://api.vk.com/method/wall.getComments?access_token=${accessToken}&v=5.131&need_likes=1&owner_id=${data.owner_id}&count=10&post_id=${data.id}&sort=asc&thread_items_count=2&offset=${offset.current}&thread_items_count=2&fields=photo_100&extended=1`;
  }
  console.log(data.source_id, data.post_id, data.from_id, data.id) //data.from_id. data.id
  
  const fetchComments = async () => {
    const commentsResponse = await fetch(commentsUrl)
    const commentsData = await commentsResponse.json()
    const items = commentsData.response.items.map(item => {
      return {...item, key: uuid.v4()}
    }) 
    setComments(items)
    currentLevelCommentsCount.current = commentsData.response.current_level_count - 10
    offset.current += 10
    dispatch(setProfiles(commentsData.response.profiles))
    setIsLoading(false)
  }
  
  const fetchMoreComments = async () => {
    if(currentLevelCommentsCount.current > 0) {
      const fetchMoreCommentsResponse = await fetch(commentsUrl)
      const fetchMoreCommentsData = await fetchMoreCommentsResponse.json()
      const items = await fetchMoreCommentsData.response.items.map(item => {
        return {...item, key: uuid.v4()}
      }) 
      currentLevelCommentsCount.current -= 10
      offset.current += 10
      dispatch(pushProfiles(fetchMoreCommentsData.response.profiles))
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
      postId={item.post_id}
      ownerId={item.owner_id}
      attachments={item?.attachments}
      is_deleted={item.deleted}
      isLightTheme={isLightTheme}
    />
  )

  const commentSeparator = () => (
    <DividerWithLine dividerColor={!isLightTheme ? COLORS.white : COLORS.primary_dark} dividerHeight={12}/>
  )

  const handleNavigationBack = () => {
    navigation.pop()
  }

  const listHeader = () => {
    // console.log(data)
    // console.log(data.likes)
    if (data.copy_history === undefined) {
    return (
      <>
        <Post data={data} navigation={navigation} openedPost={false} isLigthTheme={isLightTheme}/>
        <OpenedPostBottom 
          likes={data?.likes?.count} 
          reposts={data?.reposts?.count} 
          views={data?.views?.count} 
          comments={data?.comments?.count}
          isLightTheme={isLightTheme}
        />
      </>
    )
    }
    return (
      <>
        <Repost data={data} openedPost={false} navigation={navigation} isLightMode={isLightTheme}/>
        <OpenedPostBottom 
          likes={data?.likes?.count} 
          reposts={data?.reposts?.count} 
          views={data?.views?.count} 
          comments={data?.comments?.count}
          isLightTheme={isLightTheme}
        />
      </>
    )
  }

  const listFooter = () => {
    return <DividerWithLine dividerColor={!isLightTheme ? COLORS.white : COLORS.primary_dark} dividerHeight={10} marginB={10} borderBL={4} borderBR={4}/>
  }

  const handleClosingCommentAuthorInfo = () => {
    dispatch(closeAuthorInfo());
  }

  const scrollingToComments = () => {
    if(shouldScroll) {
      commentsList.current.scrollToIndex({index: 0, animated: true,viewPosition: 0.1})
    }
  }

  const keyExtractor = (item) => {
    return item.key
  }
  return (
    <SafeAreaView style={!isLightTheme ? styles.openPostContainerLight : styles.openPostContainerDark}>
      <StatusBar barStyle={COLORS.white} backgroundColor={!isLightTheme ? COLORS.primary : COLORS.primary_dark}/>
      <CustomHeader 
        headerName={<Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Post</Text>}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={handleNavigationBack}
        isLightTheme={isLightTheme}
      />
      {
        isLoading ? 
        <View style={styles.activityContainer}>
          <ActivityIndicator size={50} color={!isLightTheme ? COLORS.primary : COLORS.white}/>
        </View> :
        <>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Modal  
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} 
              animationType='slide' 
              transparent={true} 
              visible={isAuthorInfoOpen} 
              onRequestClose={() => {dispatch(closeAuthorInfo())}}
            >
              <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.modalView}>
                  {
                    registrationDateIsFetching ? 
                      <View style={styles.activityContainer}>
                        <ActivityIndicator size={50} color={COLORS.primary}/>
                      </View> :
                      <>
                      <View style={styles.commentInfoHeader}>
                      <TouchableOpacity style={styles.crossButton} activeOpacity={1} onPress={handleClosingCommentAuthorInfo}>
                        <AntDesign name='close' size={20} color={COLORS.primary}/>
                      </TouchableOpacity>
                      </View>
                      <View style={styles.nameAvatarContainer}>
                      <Image style={styles.avatarInfo} source={{uri: authorImgUrl}}/>
                      <Text style={styles.nameInfo}>{authorName}</Text>
                      </View>
                      <View style={styles.registredContainer}>
                      <Text style={styles.registredText}>Registred: {getTimeDate(regestrationDate)}</Text>
                      </View>
                    </>
                  }  
                </View>
              </View>
            </Modal>
          </View>
          <FlatList
            onLayout={scrollingToComments}
            ref={commentsList}
            ListHeaderComponent={listHeader}
            data={comments} 
            renderItem={renderComment}      
            ItemSeparatorComponent={commentSeparator}
            onEndReached={fetchMoreComments}
            ListFooterComponent={listFooter}
            onEndReachedThreshold={1}
            style={{marginLeft: 5, marginRight: 5}}
            keyExtractor={keyExtractor}
          />
          <TextInputField isLightTheme={isLightTheme}/>
        </>
      }
    </SafeAreaView>
  )
}

export default memo(OpenPost)

const styles = StyleSheet.create({
  activityContainer: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
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
  nameInfo: {
    fontSize: 16, 
    fontWeight: '700', 
    color: COLORS.black, 
    marginLeft: 5,
  },
  registredContainer: {
    marginTop: 40
  },
  registredText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black
  },
  openPostContainerLight: {
    flex: 1,
    backgroundColor: COLORS.light_smoke,
  },
  openPostContainerDark: {
    flex: 1,
    backgroundColor: COLORS.background_dark,
  }
})