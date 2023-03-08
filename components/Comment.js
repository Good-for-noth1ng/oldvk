import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, memo, } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { COLORS } from '../constants/theme'
import { 
  openAuthorInfo, 
  setAuthorName, 
  setAuthorImgUrl, 
  setRegistrationDate, 
  startLoadingRegistrationDate,
  stopLoadingRegistrationDate  
} from '../redux/commentsSlice'
import CommentBottom from './CommentBottom'
import CommentReplies from './CommentReplies'
import DividerWithLine from './DividerWithLine'
import CommentPhotos from './CommentPhotos'
import { getHyperlinkInText } from '../utils/hyperlinks'

const Comment = ({from_id, is_deleted, attachments, commentText, commentDate, likes, threadCount, threadComments, commentId, navigation, postId, ownerId, isLightTheme}) => {
  const dispatch = useDispatch()
  const profiles = useSelector(state => state.comments.profiles)
  const [name, setName] = useState('')
  const [photoUrl, setPhotoUrl] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(likes)
  const [showAuthorInfo, setShowAuthorInfo] = useState(false)
  let commentPhotos = []

  if (attachments !== undefined) {
    for (let i = 0; i < attachments.length; i++) {
      if (attachments[i].type === 'photo') {
        commentPhotos.push(attachments[i].photo)
      }
    }
  }
  useEffect(() => {
    // console.log(data.from_id)
    profiles.forEach(item => {
      if (item.id === from_id) {
        setName(`${item.first_name} ${item.last_name}`);
        setPhotoUrl(item.photo_100);
      }
    })
  }, [])

  const handleLikePress = () => {
    if(!isLiked) {
      setLikesCount(prevState => prevState + 1);
      setIsLiked(true);
    } else {
      setLikesCount(prevState => prevState - 1);
      setIsLiked(false);
    }
  }
  const fetchProfileInfo = (vkId, name, photoUrl) => {
    let profileDataRegUrl = `https://vkdia.com/pages/fake-vk-profile/registration-date?vkId=${vkId}`;
    const re = /^\d*$/g; 
    dispatch(startLoadingRegistrationDate())
    dispatch(openAuthorInfo());
    fetch(profileDataRegUrl)
      .then(response => response.json())
      .then(result => {
        const regDate = result.regDate 
        if (re.test(regDate)) {
          dispatch(setRegistrationDate(regDate))
          dispatch(setAuthorName(name));
          dispatch(setAuthorImgUrl(photoUrl));
          dispatch(stopLoadingRegistrationDate());
        }
      })
  }

  const handleProfilePress = () => {  
    fetchProfileInfo(from_id, name, photoUrl)  
  }
  // console.log(threadComments[0])
  return (
    <>
    <View style={!isLightTheme ? styles.commentContainerLight : styles.commentContainerDark}>
      <TouchableOpacity activeOpacity={1} style={styles.imageContainer} onPress={handleProfilePress}>
        <Image source={is_deleted ? require('../assets/avatars/banned-light.jpg') : {uri: photoUrl}} style={styles.image}/>
      </TouchableOpacity>
      <View style={styles.commentConentContainer}>
        {
          is_deleted ? <View style={styles.deltedContainer}><Text style={styles.deletedText}>Comment deleted</Text></View> : 
          <>
            <Text style={!isLightTheme ? styles.authorNameLight : styles.authorNameDark}>{name}</Text>
            {commentText ? <Text style={!isLightTheme ? styles.textLight : styles.textDark}>
              {getHyperlinkInText(commentText)}
            </Text> : null}
            {commentPhotos.length > 0 ? <CommentPhotos commentPhotos={commentPhotos}/> : null}
          </>
        }
        <CommentBottom likesCount={likesCount} handleLikePress={handleLikePress} date={commentDate} isLiked={isLiked}/>
      </View>
    </View>
    {threadCount > 0 && <DividerWithLine dividerColor={!isLightTheme ? COLORS.white : COLORS.primary_dark} dividerHeight={8}/>}
    <CommentReplies 
      threadComments={threadComments} 
      threadCount={threadCount} 
      fetchProfileInfo={fetchProfileInfo}
      startOfThreadId={commentId}
      navigation={navigation}
      postId={postId}
      ownerId={ownerId}
      isLightTheme={isLightTheme}
    />
  </>
  )
}

// export default memo(Comment)
export default Comment

const styles = StyleSheet.create({
  commentContainerLight: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.white
  },
  commentContainerDark: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.primary_dark
  },
  imageContainer: {
    marginRight: 7
  },
  image: {
    width: 38, 
    height: 38, 
    borderRadius: 100,
  },
  
  commentConentContainer: {
    width: '86%',
  },
  textLight: {
    fontSize: 15,
    color: COLORS.black,
  },
  textDark: {
    fontSize: 15,
    color: COLORS.primary_text
  },
  authorNameLight: {
    fontWeight: '700', 
    fontStyle: 'normal', 
    fontSize: 14,
    color: COLORS.black
  },
  authorNameDark: {
    fontWeight: '700', 
    fontStyle: 'normal', 
    fontSize: 14,
    color: COLORS.primary_text
  },
  likeIcon: {
    marginRight: 2,
  },
  deltedContainer: {
    height: 35,
    justifyContent: 'center',
  },
  deletedText: {
    color: COLORS.secondary,
    fontSize: 16,
  },
})