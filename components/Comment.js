import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState, memo, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLORS } from '../constants/theme'
import { getTimeDate } from '../utils/date'
import { getShortagedNumber } from '../utils/numShortage'
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

const Comment = ({data, extraData, isReply, repliesCount}) => {
  const dispatch = useDispatch()
  const profiles = useSelector(state => state.comments.profiles)
  const [name, setName] = useState('')
  const [photoUrl, setPhotoUrl] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(data?.likes?.count !== undefined ? data.likes.count : 0)
  const [showAuthorInfo, setShowAuthorInfo] = useState(false)
  
  useEffect(() => {
    // console.log(data.from_id)
    profiles.forEach(item => {
      if (item.id === data.from_id) {
        setName(`${item.last_name} ${item.first_name}`);
        setPhotoUrl(item.photo_100);
      }
    })
  }, [])

  const handleLikePress = () => {
    if(!isLiked) {
      setLikesCount(likesCount + 1);
      setIsLiked(true);
    } else {
      setLikesCount(likesCount - 1);
      setIsLiked(false);
    }
  }
  
  const handleProfilePress = () => {
    const profileDataRegUrl = `https://vkdia.com/pages/fake-vk-profile/registration-date?vkId=${data.from_id}`;
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
  
  return (
    <>
    <View style={isReply ?  styles.commentReplyContainer: styles.commentContainer}>
      <TouchableOpacity activeOpacity={1} style={styles.imageContainer} onPress={handleProfilePress}>
        <Image source={{uri: photoUrl}} style={styles.image}/>
      </TouchableOpacity>
      <View style={styles.commentConentContainer}>
        <Text style={styles.authorName}>{name}</Text>
        <Text>{data.text}</Text>
        <CommentBottom likesCount={likesCount} handleLikePress={handleLikePress} date={data.date} isLiked={isLiked}/>
      </View>
    </View>
    <CommentReplies repliesList={extraData} repliesCount={repliesCount}/>
  </>
  )
}

export default memo(Comment)

const styles = StyleSheet.create({
  commentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    // marginLeft: 5,
    // marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.white
  },
  imageContainer: {
    marginRight: 7
  },
  image: {
    width: 38, 
    height: 38, 
    borderRadius: 100,
  },
  commentReplyContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    width: '95%',
    // marginLeft: 5,
    // marginRight: 5,
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