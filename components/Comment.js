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


const Comment = ({data}) => {
  const dispatch = useDispatch()
  const profiles = useSelector(state => state.comments.profiles)
  const [name, setName] = useState('')
  const [photoUrl, setPhotoUrl] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(data.likes.count)
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

  const handleLikePress = useCallback(() => {
    if(!isLiked) {
      setLikesCount(likesCount + 1);
      setIsLiked(true);
    } else {
      setLikesCount(likesCount - 1);
      setIsLiked(false);
    }
  })
  
  const handleProfilePress = useCallback(() => {
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
  })

  return (
    <View style={styles.commentContainer}>
      <TouchableOpacity activeOpacity={1} style={{marginRight: 7}} onPress={handleProfilePress}>
        <Image source={{uri: photoUrl}} style={{width: 38, height: 38, borderRadius: 100}}/>
      </TouchableOpacity>
      <View style={{width: '86%'}}>
        <Text style={{fontWeight: '700', fontStyle: 'normal', fontSize: 14}}>{name}</Text>
        <Text>{data.text}</Text>
        <View style={{width: '95%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: COLORS.secondary, fontSize: 13}}>{getTimeDate(data.date)}</Text>
            <Text style={{marginLeft: 10, color: COLORS.secondary, fontWeight: '700', fontSize: 13}}>Reply</Text>
          </View>
          <TouchableOpacity activeOpacity={1} style={styles.likeOpacityArea} onPress={handleLikePress}>
            {
              isLiked ?
              <>
                <FontAwesome name='heart'  color={COLORS.primary} size={13}/>
                <Text style={styles.likesNumberText}>{getShortagedNumber(likesCount)}</Text>
              </>
              :
              <>
                <FontAwesome name='heart-o'  color={COLORS.secondary} size={13} />
                <Text style={styles.likesNumberText}>{getShortagedNumber(likesCount)}</Text>
              </>
            }
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default memo(Comment)

const styles = StyleSheet.create({
  commentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.white
  },
  commentConentContainer: {

  },
  likeIcon: {
    marginRight: 2,
  },
  likesNumberText: {
    fontSize: 12,
    color: COLORS.secondary
  },
  likeOpacityArea: {
    width: 28, 
    display:'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    
  }

})