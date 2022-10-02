import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import { COLORS } from '../constants/theme'
import { useState, useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather'

const Post = ({data}) => {
  const [isPressed, setIsPressed] = useState(false)
  let comments = 0
  if (data.comments !== undefined) {
    comments = data.comments.count
  }
  const [commentsCount, setCommentsCount] = useState(comments) 
  let likes = 0
  if (data.likes !== undefined) {
    likes = data.likes.count
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
    postText = data.text.split(' ').slice(0, 20).join(' ')
  }
  const [text, setText] = useState(postText)
  const [readMore, setReadMore] = useState(false)
  // useEffect(() => {

  // }, [])
  
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeaderContainer}>
        <View style={styles.postHeaderLeftsideContainer}></View>
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
            {readMore ? ' Show less' : ' Read more'}
          </Text>
        </Text>
      </View>
      <View style={styles.attachmentsContainer}></View>
      <View style={styles.postBottomContainer}>
        <View>
          <TouchableOpacity style={styles.buttonContainer} activeOpacity={1}>
            <MaterialCommunityIcons name='comment' color={COLORS.secondary} size={20}/>
            <Text style={styles.buttonText}>{commentsCount}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomRightContainer}>
          <TouchableOpacity style={styles.buttonContainer}>
            <FontAwesome name='share' color={COLORS.secondary} size={20}/>
            <Text style={styles.buttonText}>{repostsCount}</Text>  
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} activeOpacity={1} onPress={hadnleLikePress}>
            <AntDesign name='like1' color={!isPressed ? COLORS.secondary : COLORS.primary} size={20} />
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
  postHeaderContainer: {},
  postHeaderLeftsideContainer: {},
  postHeaderRightsideContainer: {},
  postTextContainer: {},
  attachmentsContainer: {},
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
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 45,
    height: 30,
    // backgroundColor: COLORS.smoke
  },
  buttonText: {
    color: COLORS.secondary
  },
  showMoreText: {
    color: COLORS.primary
  }
})