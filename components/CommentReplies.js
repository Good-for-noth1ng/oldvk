import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CommentReply from './CommentReply'
import { setDataForFetchingCommentThread } from '../redux/commentsSlice'
import { COLORS } from '../constants/theme'
import DividerWithLine from './DividerWithLine'

const CommentReplies = ({threadComments, threadCount, fetchProfileInfo, startOfThreadId, navigation, ownerId, postId}) => {
  const dispatch = useDispatch()
  const navigateToCommentThread = () => {
    console.log(ownerId, postId, startOfThreadId)
    dispatch(setDataForFetchingCommentThread({
      threadMainCommentId: startOfThreadId,
      ownerId: ownerId,
      postId: postId
    }))
    navigation.navigate('CommentThread')
  }
  return (
    <View style={styles.repliesListContainer}>
      {
        threadComments.length > 0 ? 
          threadComments.length === 2 ?
            <>
              <CommentReply 
                commentDate={threadComments[0].date} 
                from_id={threadComments[0].from_id} 
                commentText={threadComments[0].text}
                likes={threadComments[0].likes.count}
                fetchProfileInfo={fetchProfileInfo}
              />
              <DividerWithLine dividerColor={COLORS.white} dividerHeight={5}/>
              <CommentReply
                commentDate={threadComments[1].date} 
                from_id={threadComments[1].from_id} 
                commentText={threadComments[1].text}
                likes={threadComments[1].likes.count}
                fetchProfileInfo={fetchProfileInfo} 
              />
              <DividerWithLine dividerColor={COLORS.white} dividerHeight={7}/>
              {
                threadCount > 2 &&
                <View style={styles.showMoreContainer}>
                  <TouchableOpacity style={styles.showMoreCommentsButton} onPress={navigateToCommentThread}> 
                    <AntDesign name={'arrowdown'} color={COLORS.primary} size={15}/>
                    <Text style={styles.showMoreCommentsButtonText}>Show more</Text>
                  </TouchableOpacity>
                </View>
              }
            </> : 
            <CommentReply 
              commentDate={threadComments[0].date} 
              from_id={threadComments[0].from_id} 
              commentText={threadComments[0].text}
              likes={threadComments[0].likes.count}
              fetchProfileInfo={fetchProfileInfo}
          /> 
        : null
      }
    </View>
  )
}

export default CommentReplies

const styles = StyleSheet.create({
  repliesListContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
    // marginLeft: 5,
    // marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.white
  },
  showMoreContainer: {
    width: '92%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  showMoreCommentsButton: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  showMoreCommentsButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '700'
  }
})