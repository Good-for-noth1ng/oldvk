import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import CommentBottom from './CommentBottom'
import { COLORS } from '../constants/theme'

const CommentReply = ({fetchProfileInfo, from_id, commentText, commentDate, likes}) => {
  const profiles = useSelector(state => state.comments.profiles)
  const [name, setName] = useState('')
  const [photoUrl, setPhotoUrl] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(likes)
  
  useEffect(() => {
    // console.log(data.from_id)
    profiles.forEach(item => {
      if (item.id === from_id) {
        setName(`${item.last_name} ${item.first_name}`);
        setPhotoUrl(item.photo_100);
      }
    })
  }, [])

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
    <View style={styles.commentReplyContainer}>
      <TouchableOpacity activeOpacity={1} style={styles.imageContainer} onPress={handleProfilePress}>
        <Image source={{uri: photoUrl}} style={styles.image}/>
      </TouchableOpacity>
      <View style={styles.commentConentContainer}>
        <Text style={styles.authorName}>{name}</Text>
        <Text>{commentText}</Text>
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
  commentReplyContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    width: '95%',
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.white
  },
  commentConentContainer: {
    width: '86%',
  },
  authorName: {
    fontWeight: '700', 
    fontStyle: 'normal', 
    fontSize: 14,
  },
  likeIcon: {
    marginRight: 2,
  },
})