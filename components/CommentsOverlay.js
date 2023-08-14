import { StyleSheet, Text, View, Animated, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import * as Clipboard from 'expo-clipboard'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import { COLORS } from '../constants/theme'
import { getTimeDate } from '../utils/date'

const CommentsOverlay = ({ slideAnimation, isLightTheme, handleShadowTouch, navigation }) => {
  const commentsGeneralData = useSelector(state => state.comments); 
  
  const authorName = commentsGeneralData.authorName;
  const authorImgUrl = commentsGeneralData.authorImgUrl;
  const registrationDate = commentsGeneralData.registrationDate;
  const registrationDateIsFetching = commentsGeneralData.authorInfoIsFetching;
  const authorId = commentsGeneralData.authorId
  const commentText = commentsGeneralData.commentText
  // console.log(ownerId)
  const onShadowPress = () => {
    handleShadowTouch()
  }

  const copyCommentText = async () => {
    await Clipboard.setStringAsync(commentText)
    ToastAndroid.show('Copied!', ToastAndroid.SHORT)
  }

  const navigateToUserProfile = () => {
    if (authorId > 0) {
      navigation.push('UserProfile', { userId: authorId })
    }
  }

  const navigateToUserList = () => {
    navigation.push('ReactedUsersList')
  }
  
  const commentMenuButtonColor = isLightTheme ? COLORS.primary : COLORS.white

  return (
    <Animated.View style={[styles.box, {transform: [{translateY: slideAnimation}]}]}>
      <TouchableOpacity style={styles.upperShadow} onPress={onShadowPress} activeOpacity={0}>
      </TouchableOpacity>
      <View style={[styles.menuContainer]}>
        <TouchableOpacity style={styles.sideShadow} onPress={onShadowPress} activeOpacity={0}>
        </TouchableOpacity>
        <View style={[styles.menu, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.very_dark_gray}]}>
          {
            registrationDateIsFetching ? 
            <View>
              <ActivityIndicator size={40} color={isLightTheme ? COLORS.primary : COLORS.white}/>
            </View> :
            <>
              <View style={styles.nameAvatarContainer}>
                <Image style={styles.avatarInfo} source={{uri: authorImgUrl}}/>
                <Text style={[styles.nameInfo, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>{authorName}</Text>
              </View>
              <View style={styles.registredContainer}>
                <Text style={styles.registredText}>Registred: {getTimeDate(registrationDate)}</Text>
              </View>
            </>
          }
          
          
          <View style={{flexDirection: 'row', justifyContent: 'center', }}>
            <View style={{height: 200, alignItems: 'flex-start', paddingLeft: 30, paddingRight: 30}}>
              <TouchableOpacity activeOpacity={0.8} onPress={navigateToUserProfile} style={styles.commentMenuButton}>
                <Feather name='user' color={isLightTheme ? COLORS.primary : COLORS.white} size={22}/>
                <Text style={[styles.commentMenuButtonText, isLightTheme ? {color: COLORS.primary} : {color: COLORS.white}]}>
                  Profile
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.commentMenuButton}>
                <Ionicons name='arrow-undo-outline' color={isLightTheme ? COLORS.primary : COLORS.white} size={22} />
                <Text style={[styles.commentMenuButtonText, isLightTheme ? {color: COLORS.primary} : {color: COLORS.white}]}>Reply</Text>
              </TouchableOpacity>
                
              <TouchableOpacity activeOpacity={0.8} onPress={navigateToUserList} style={styles.commentMenuButton}>
                <Feather name='users' color={isLightTheme ? COLORS.primary : COLORS.white} size={22}/>
                <Text style={[styles.commentMenuButtonText, isLightTheme ? {color: COLORS.primary} : {color: COLORS.white}]}>Liked</Text>
              </TouchableOpacity>
            </View>

            <View style={{height: 200, alignItems: 'flex-start', paddingLeft: 30, paddingRight: 30}}>
              <TouchableOpacity activeOpacity={0.8} onPress={copyCommentText} style={styles.commentMenuButton}>
                <MaterialCommunityIcons name='content-copy' color={isLightTheme ? COLORS.primary : COLORS.white} size={22}/>
                <Text style={[styles.commentMenuButtonText, isLightTheme ? {color: COLORS.primary} : {color: COLORS.white}]}>
                  Copy
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.commentMenuButton}>
                <Ionicons name='arrow-redo-outline' color={isLightTheme ? COLORS.primary : COLORS.white} size={22}/>
                <Text style={[styles.commentMenuButtonText, isLightTheme ? {color: COLORS.primary} : {color: COLORS.white}]}>
                  Share
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.commentMenuButton}>
                <Octicons name='report' color={isLightTheme ? COLORS.primary : COLORS.white} size={22}/>
                <Text style={[styles.commentMenuButtonText, isLightTheme ? {color: COLORS.primary} : {color: COLORS.white}]}>
                  Report
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.sideShadow} onPress={onShadowPress} activeOpacity={0}>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.downShadow} onPress={onShadowPress} activeOpacity={0}>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default CommentsOverlay

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    position: 'absolute',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '60%' //60%
  },
  upperShadow: {
    backgroundColor: COLORS.black,
    opacity: 0,
    width: '100%',
    height: '20%',
  },
  menu: {
    width: '94%',
    height: '100%',
    elevation: 30,
    shadowColor: COLORS.black,
    borderRadius: 5,
    paddingTop: 35,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
  },
  sideShadow: {
    height: '100%',
    width: '3%',
    backgroundColor: COLORS.black,
    opacity: 0,
  },
  downShadow: {
    backgroundColor: COLORS.black,
    opacity: 0,
    width: '100%',
    height: '40%',
  },
  nameAvatarContainer: {
    width: '100%',
    display: 'flex',
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInfo: {
    width: 50, 
    height: 50, 
    borderRadius: 100, 
    marginRight: 5,
  },
  nameInfo: {
    fontSize: 17, 
    fontWeight: '700',  
    marginLeft: 5,
  },
  registredContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  registredText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondary
  },
  commentMenuButton: {
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    // paddingLeft: 15,
    borderRadius: 5,
  },
  commentMenuButtonText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
})