import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Animated } from 'react-native'
import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserID } from '../redux/userWallSlice'
import CommentBottom from './CommentBottom'
import CommentPhotos from './CommentPhotos'
import { COLORS } from '../constants/theme'
import { getHyperlinkInText } from '../utils/hyperlinks'

const CommentReply = ({fetchProfileInfo, from_id, commentText, commentDate, likes, isLightTheme, openCommentMenu, commentId, ownerId, navigation, attachments, author}) => {
  const dispatch = useDispatch()
  const authorsGeneralInfo = useSelector(state => state.comments)
  const groups = authorsGeneralInfo.groups
  const profiles = authorsGeneralInfo.profiles
  const authors = [...groups, ...profiles]
  const name = author.name ? author.name : `${author.first_name} ${author.last_name}` 
  const photoUrl = author.photo_100
  let commentPhotos = []
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(likes)

  const colorTransitionAnimation = new Animated.Value(0)
  const commentBgEndColor = isLightTheme ? COLORS.light_blue : COLORS.light_black
  const commentReplyBgInitColor = isLightTheme ? COLORS.white : COLORS.primary_dark
  const commentReplyBgColor = colorTransitionAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [commentReplyBgInitColor, commentBgEndColor]
  })

  if (attachments) {
    for (let i = 0; i < attachments.length; i++) {
      if (attachments[i].type === 'photo') {
        commentPhotos.push(attachments[i].photo)
      }
    }
  }
  profiles.forEach(item => {
    if (item.id === from_id) {
      name = `${item.first_name} ${item.last_name}`;
      photoUrl = item.photo_100; 
    }
  })


  if (name === undefined) {
    groups.forEach(item => {
      if (item.id === (from_id * (-1))) {
        name = item.name
        photoUrl = item.photo_100
      }
    })
  }

  const handleProfilePress = () => {
    dispatch(setUserID(from_id))
    navigation.push('UserProfile', {userId: from_id})
    // fetchProfileInfo(from_id, name, photoUrl, commentId)
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

  const onPressIn = () => {
    Animated.timing(colorTransitionAnimation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false
    }).start();
  }

  const onPressOut = () => {
    Animated.timing(colorTransitionAnimation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false
    }).start();
  }

  const handleLongPress = () => {
    fetchProfileInfo(from_id, name, photoUrl, commentId)
    openCommentMenu()
  }

  return (
    <Pressable 
      onPressIn={onPressIn} 
      onPressOut={onPressOut} 
      unstable_pressDelay={100} 
      onLongPress={handleLongPress}
      delayLongPress={1000}
    >
      <Animated.View 
        style={[styles.commentReplyContainer, {backgroundColor: commentReplyBgColor}]}
      >
        <TouchableOpacity activeOpacity={1} style={styles.imageContainer} onPress={handleProfilePress}>
          <Image source={{uri: photoUrl}} style={styles.image}/>
        </TouchableOpacity>
        <View style={styles.commentConentContainer}>
          <Text 
            style={[
              styles.authorName, 
              isLightTheme ? {color: COLORS.black} : {color: COLORS.primary_text}
            ]}
          >
            {name}
          </Text>
          <Text style={[styles.replyText, isLightTheme ? {color: COLORS.black} : {color: COLORS.primary_text}]}>
            {getHyperlinkInText(commentText)}
          </Text>
          {commentPhotos.length > 0 ? <CommentPhotos commentPhotos={commentPhotos}/> : null}
          <CommentBottom likesCount={likesCount} handleLikePress={handleLikePress} date={commentDate} isLiked={isLiked}/>
        </View>
      </Animated.View>
    </Pressable>
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
    borderRadius: 5,
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
    width: '90%',
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
  commentConentContainer: {
    width: '86%',
  },
  authorName: {
    fontWeight: '700', 
    fontStyle: 'normal', 
    fontSize: 14,
  },
  replyText: {
    fontSize: 15,
  },
  likeIcon: {
    marginRight: 2,
  },
})