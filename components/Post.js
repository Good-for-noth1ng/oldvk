import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import { COLORS } from '../constants/theme'
import { useState, useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux'

const Post = ({data}) => {
  let groupData = {}
  let profileData = {}
  if (data.source_id < 0) {
    groupData = useSelector(state => state.news.groups.find(group => group.id === 0 - data.source_id)) 
  } else {
    profileData = useSelector(state => state.news.profiles.finde(profile => profile.id === data.source_id))
  }
  const [group, setGroup] = useState(groupData)
  const [profile, setProfile] = useState(profileData)
  const [isPressed, setIsPressed] = useState(false)
  let comments = 0
  if (data.comments !== undefined) {
    comments = data.comments.count
  }
  const [commentsCount, setCommentsCount] = useState(comments) 
  let likes = 0
  if (data.likes !== undefined) {
    likes = data.likes.count
    if (likes >= 1000) {
      likes = Math.floor(likes / 1000)
      likes = String(likes).concat('k')
    }
  }
  const [likeCount, setLikeCount] = useState(likes)
  let reposts = 0
  if (data.reposts !== undefined) {
    reposts = data.reposts.count
  }
  const [repostsCount, setRepostsCount] = useState(reposts)
  const hadnleLikePress = () => {
    setIsPressed(!isPressed)
    isPressed ? setLikeCount(likeCount-1) :  setLikeCount(likeCount+1)
  }
  let postText = ''
  if (data.text !== undefined) {
    postText = data.text.split('\n').slice(0, 5).join('\n')
  }
  const [text, setText] = useState(postText)
  const [readMore, setReadMore] = useState(false)
  const date = new Date(data.date * 1000).toLocaleDateString('en-US')
  const [time, setTime] = useState(null)
  let postPhotos = []
  if (data.attachments !== undefined) {
    const attachments = data.attachments
    for (let i = 0; i < attachments.length; i++) {
      if (attachments[i].type === 'photo') {
        postPhotos.push(attachments[i].photo)
      } 
    }
  }
  const [photos, setPhotos] = useState(postPhotos)
  const renderPhotos = photos.map(photo => (
    <Image source={{uri: photo.sizes[0].url}} key={photo.access_key} style={{width: photo.sizes[0].width, height: photo.sizes[0].height}}/>
  ))
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeaderContainer}>
        <View style={styles.postHeaderLeftsideContainer}>
          <Image style={styles.postImageSource} source={{uri: group ? group.photo_100 : profile.photo_100}}/>
          <View style={styles.sourceNameContainer}>
            <View style={styles.postNameContainer}>
              <Text style={styles.postNameText}>{group ? group.name : profile.last_name + ' ' + profile.first_name}</Text>
            </View>
            <Text>{date}</Text>
          </View>
        </View>
        <View style={styles.postHeaderRightsideContainer}>
          <Feather name='more-vertical' size={20} color={COLORS.secondary}/>
        </View>
      </View>
      <View style={styles.postTextContainer}>
        <Text>
          {text}
          <Text
            style={styles.showMoreText}
            onPress={() => {
              if (!readMore) {
                setText(data.text)
                setReadMore(true)
              } else {
                if (data.text !== undefined) {
                  setText(data.text.split(' ').slice(0, 20).join(' '));
                  setReadMore(false)
                }
              }
            }}
          >
            {!readMore && ' Read more'}
          </Text>
        </Text>
      </View>
      <View style={styles.attachmentsContainer}>
        {
          renderPhotos && renderPhotos
        }
      </View>
      <View style={styles.postBottomContainer}>
        <View>
          <TouchableOpacity style={styles.buttonContainer} activeOpacity={1}>
            <MaterialCommunityIcons style={styles.iconButton} name='comment' color={COLORS.secondary} size={20}/>
            <Text style={styles.buttonText}>{commentsCount}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomRightContainer}>
          <TouchableOpacity style={styles.buttonContainer}>
            <FontAwesome style={styles.iconButton} name='share' color={COLORS.secondary} size={20}/>
            <Text style={styles.buttonText}>{repostsCount}</Text>  
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} activeOpacity={1} onPress={hadnleLikePress}>
            <AntDesign style={{marginRight: 3}} color={isPressed ? COLORS.primary : COLORS.secondary} name='like1' size={20} />
            <Text style={styles.buttonText}>{likeCount}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  postContainer: {
    margin: 4,
    padding: 10,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  postHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  postHeaderLeftsideContainer: {
    display: 'flex',
    width: '90%',
    // padding: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // backgroundColor: COLORS.smoke
  },
  postNameContainer: {
    width: 230,
    // backgroundColor: COLORS.secondary
  },
  postImageSource: {
    width: 50,
    height: 50,
    borderRadius: 4
  },
  sourceNameContainer: {
    marginLeft: 10,
    // display: 'flex',
    // alignItems: 'flex-end',
    // backgroundColor: COLORS.secondary
  },
  postHeaderRightsideContainer: {
    // marginLeft: 10, 
    // backgroundColor: COLORS.secondary
  },
  postTextContainer: {},
  attachmentsContainer: {
    // width: 100,
    // height: 100,
  },
  postBottomContainer: {
    display: 'flex',
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bottomRightContainer: {
    display: 'flex',
    width: '33%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 30,
    // backgroundColor: COLORS.smoke
  },
  iconButton: {
    marginRight: 3,
    color: COLORS.secondary
  },
  buttonText: {
    marginLeft: 3,
    color: COLORS.secondary
  },
  showMoreText: {
    color: COLORS.primary,
    fontWeight: '700'
  },
  postNameText: {
    fontSize: 16,
    fontWeight: '600'
  }
})