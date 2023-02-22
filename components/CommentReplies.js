import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Comment from './Comment'
import { COLORS } from '../constants/theme'
const CommentReplies = ({repliesList, repliesCount}) => {
  return (
    <View style={styles.repliesListContainer}>
      {
        repliesList !==undefined ? 
          repliesList.length >= 2 ?
            <>
              <Comment data={repliesList[0]} isReply={true}/>
              <Comment data={repliesList[1]} isReply={true}/>
              {
                repliesCount > 2 &&
                <View style={styles.showMoreContainer}>
                  <TouchableOpacity style={styles.showMoreCommentsButton}> 
                    <AntDesign name={'arrowdown'} color={COLORS.primary} size={15}/>
                    <Text style={styles.showMoreCommentsButtonText}>Show more</Text>
                  </TouchableOpacity>
                </View>
              }
            </> : 
            <Comment data={repliesList[0]} isReply={true}/> 
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
    width: '95%',
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