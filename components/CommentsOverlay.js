import { StyleSheet, Text, View, Animated, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import { COLORS } from '../constants/theme'
import { getTimeDate } from '../utils/date'

const CommentsOverlay = ({slideAnimation, isLightTheme, handleShadowTouch, registrationDate, registrationDateIsFetching, authorImgUrl, authorName, navigation}) => {
  
    const onShadowPress = () => {
    handleShadowTouch()
  }

  const copyCommentText = async (commentText) => {
    await Clipboard.setStringAsync(commentText)
    ToastAndroid.show('Copied!', ToastAndroid.SHORT)
  }

  const navigateToUserProfile = (userId) => {
    if (userId > 0) {
      navigation.push('UserProfile', {userId})
    }
  }

  const navigateToUserList = () => {
    navigation.push('ReactedUsersList')
  }

  const commentMenuButtonColor = isLightTheme ? COLORS.primary : COLORS.white
  // const commentMenuButtons = [
  //   [
  //     // {
  //     //   icon: <Feather name='user' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>,
  //     //   text: 'Profile',
  //     //   key: 1863,
  //     //   type: 'profile',
  //     //   handleTouch: (...args) => navigateToUserProfile(...args)
  //     // },
  //     // {
  //     //   icon: <Ionicons name='arrow-undo-outline' color={commentMenuButtonColor} size={commentMenuButtonIconSize} />,
  //     //   text: 'Reply',
  //     //   key: 1920,
  //     //   type: 'reply'
  //     // },
  //     // {
  //     //   icon: <Feather name='users' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>,
  //     //   text: 'Liked',
  //     //   key: 2100,
  //     //   type: 'liked',
  //     //   handleTouch: (...args) => navigateToUserList(...args)
  //     // },
  //   ],
  //   [
  //     // {
  //     //   icon: <MaterialCommunityIcons name='content-copy' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>,
  //     //   text: 'Copy',
  //     //   key: 192864,
  //     //   type: 'copy',
  //     //   handleTouch: (...args) => copyCommentText(...args)
  //     // },
  //     // {
  //     //   icon: <Ionicons name='arrow-redo-outline' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>,
  //     //   text: 'Share',
  //     //   key: 123,
  //     //   type: 'share',
  //     // },
  //     // {
  //     //   icon: <Octicons name='report' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>,
  //     //   text: 'Report',
  //     //   key: 782,
  //     //   type: 'report'
  //     // },
  //   ]
  // ]

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
              <TouchableOpacity>
                <Feather name='user' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>
                <Text>Profile</Text>
              </TouchableOpacity>
              
              <TouchableOpacity>
                <Ionicons name='arrow-undo-outline' color={commentMenuButtonColor} size={commentMenuButtonIconSize} />
                <Text>Reply</Text>
              </TouchableOpacity>
                
              <TouchableOpacity>
                <Feather name='users' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>
                <Text>Liked</Text>
              </TouchableOpacity>
            </View>

            <View style={{height: 200, alignItems: 'flex-start', paddingLeft: 30, paddingRight: 30}}>
              <TouchableOpacity>
                <MaterialCommunityIcons name='content-copy' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>
                <Text>Copy</Text>
              </TouchableOpacity>
              
              <TouchableOpacity>
                <Ionicons name='arrow-redo-outline' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>
                <Text>Share</Text>
              </TouchableOpacity>
              
              <TouchableOpacity>
                <Octicons name='report' color={commentMenuButtonColor} size={commentMenuButtonIconSize}/>
                <Text>Report</Text>
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
  commentMenuButtonText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold'
  },
})