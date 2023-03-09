import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import CommentBottom from './CommentBottom'
import { COLORS } from '../constants/theme'
import { getHyperlinkInText } from '../utils/hyperlinks'

const CommentReply = ({fetchProfileInfo, from_id, commentText, commentDate, likes, isLightTheme}) => {
  const profiles = useSelector(state => state.comments.profiles)
  const groups = useSelector(state => state.comments.groups)
  const authors = [...groups, ...profiles]
  // const [name, setName] = useState('')
  // const [photoUrl, setPhotoUrl] = useState(null)
  let name
  let photoUrl
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(likes)
  
  authors.forEach(item => {
    if (item.id === from_id) {
      if(item.name === undefined) {
        name = `${item.first_name} ${item.last_name}`;
      } else {
        name = item.name;
      }
      photoUrl = item.photo_100;
    }
  })

  const handleProfilePress = () => {
    fetchProfileInfo(from_id, name, photoUrl)
  }

  const handleLikePress = () => {
    if(!isLiked) {
      setLikesCount(prevState => prevState + 1);
      setIsLiked(true);
    } else {
      setLikesCount(prevState => prevState - 1);
      setIsLiked(false);
    }
  }

  return (
    <View style={isLightTheme ? styles.commentReplyContainerLight : styles.commentReplyContainerDark}>
      <TouchableOpacity activeOpacity={1} style={styles.imageContainer} onPress={handleProfilePress}>
        <Image source={{uri: photoUrl}} style={styles.image}/>
      </TouchableOpacity>
      <View style={styles.commentConentContainer}>
        <Text style={isLightTheme ? styles.authorNameLight : styles.authorNameDark}>{name}</Text>
        <Text style={isLightTheme ? styles.replyTextLight : styles.replyTextDark}>{getHyperlinkInText(commentText)}</Text>
        <CommentBottom likesCount={likesCount} handleLikePress={handleLikePress} date={commentDate} isLiked={isLiked}/>
      </View>
    </View>
  )
}

export default CommentReply

const styles = StyleSheet.create({
  commentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.white
  },
  imageContainer: {
    marginRight: 7
  },
  image: {
    width: 32, 
    height: 32, 
    borderRadius: 100,
  },
  commentReplyContainerLight: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    width: '95%',
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.white
  },
  commentReplyContainerDark: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    width: '95%',
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.primary_dark
  },
  commentConentContainer: {
    width: '86%',
  },
  authorNameLight: {
    fontWeight: '700', 
    fontStyle: 'normal', 
    fontSize: 14,
    color: COLORS.black,
  },
  authorNameDark: {
    fontWeight: '700', 
    fontStyle: 'normal', 
    fontSize: 14,
    color: COLORS.primary_text,
  },
  replyTextLight: {
    fontSize: 15,
    color: COLORS.black
  },
  replyTextDark: {
    fontSize: 15,
    color: COLORS.primary_text
  },
  likeIcon: {
    marginRight: 2,
  },
})