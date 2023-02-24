import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import uuid from 'react-native-uuid';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomHeader from '../components/CustomHeader'
import Comment from '../components/Comment';
import { COLORS } from '../constants/theme'
import { setProfiles } from '../redux/commentsSlice';
import DividerWithLine from '../components/DividerWithLine';

const CommentThread = ({navigation}) => {
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.user.accessToken)
  const threadMainCommentId = useSelector(state => state.comments.threadMainCommentId)
  const ownerId = useSelector(state => state.comments.ownerId)
  const postId = useSelector(state => state.comments.postId)
  let getThreadUrl = `https://api.vk.com/method/wall.getComments?access_token=${accessToken}&v=5.131&comment_id=${threadMainCommentId}&extended=1&fields=photo_100&need_likes=1&owner_id=${ownerId}&post_id=${postId}&sort=asc`
  let getThreadMainCommentUrl = `https://api.vk.com/method/wall.getComment?access_token=${accessToken}&v=5.131&comment_id=${threadMainCommentId}&extended=1&fields=photo_100&owner_id=${ownerId}`
  const [isLoading, setIsLoading] = useState(true)
  const [comments, setComments] = useState(null)
  const [mainComment, setMainComment] = useState(null)

  const fetchThreadComments = async () => {
    const threadCommentsResponse = await fetch(getThreadUrl)
    const threadMainCommentResponse = await fetch(getThreadMainCommentUrl)
    const threadCommentsData = await threadCommentsResponse.json() 
    const threadMainCommentData = await threadMainCommentResponse.json()
    setMainComment(threadMainCommentData)
    // console.log(threadMainCommentData.response)
    setComments(threadCommentsData.response.items)
    dispatch(setProfiles([...threadCommentsData.response.profiles, ...threadMainCommentData.response.profiles]))
    setIsLoading(false)
  }
  useEffect(() => {
    fetchThreadComments()
  }, [])

  const goBack = () => {
    navigation.goBack()
  }
  const renderItem = ({item}) => (
    <Comment
      commentId={item.id}
      commentDate={item.date} 
      likes={item.likes.count} 
      from_id={item.from_id} 
      commentText={item.text}
      threadComments={[]}
    />
  )
  
  const listHeader = () => (
    <>
      <DividerWithLine 
        marginT={5} 
        dividerHeight={5} 
        dividerColor={COLORS.white}
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
      />
      <DividerWithLine 
        dividerHeight={16} 
        dividerLineHeight={1} 
        dividerLineColor={COLORS.light_smoke} 
        dividerLineWidth={300}
        dividerColor={COLORS.white}
        linePosition={'center'}
      />
    </>
  )

  const commentSeparator = () => (
    <DividerWithLine dividerColor={COLORS.white} dividerHeight={10}/>
  )

  const listBottom = () => (
    <DividerWithLine dividerColor={COLORS.white} dividerHeight={10} borderBL={4} borderBR={4}/>
  )
  
  const keyExtractor = () => {
    return uuid.v4()
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={COLORS.white}/>
      <CustomHeader
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
        headerName={<Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Comment replies</Text>}
      />
      {
        isLoading ?
        <View style={styles.spinnerContainer}>
            <ActivityIndicator color={COLORS.primary} size={50}/>
        </View> :
        <FlatList 
          data={comments}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          style={styles.list}
          ItemSeparatorComponent={commentSeparator}
          ListHeaderComponent={listHeader}
          ListFooterComponent={listBottom}
        />
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
    flex: 1
  },
  list: {
    marginRight: 5,
    marginLeft: 5
  }
})