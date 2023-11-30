import { StyleSheet, Text, View, Animated, TouchableOpacity, ToastAndroid, BackHandler } from 'react-native'
import React from 'react'
import * as Clipboard from 'expo-clipboard'
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import { expandShadow, collapseShadow } from '../redux/globalShadowSlice'
import { setUserForFetchingInfo } from '../redux/regDateSlice';
import { setCommentsSortType } from '../redux/commentsSlice';
import { COLORS } from '../constants/theme'

const Dropdown = ({ isLightTheme, accessToken }) => {
  const dispatch = useDispatch()
  const commentsSortType = useSelector(state => state.comments.commentsSortType)
  const dropdownData = useSelector(state => state.globalShadow)
  const isShadowExpanded = dropdownData.isOpen
  const data = dropdownData.data
  const dropdownType = dropdownData.dropdownType
  const shouldPerformAnimation = React.useRef(false)
  const listHeight = React.useRef(new Animated.Value(0)).current
  let listTargetHeight
  // console.log(data)
  switch (dropdownType) {
    case 'post':
      listTargetHeight = 160
      break;
    case 'openPost':
      listTargetHeight = 200
      break
    case 'videoListItem':
      listTargetHeight = 250
      break
    case 'group':
      listTargetHeight = 200
      break
    case 'videoScreen':
      listTargetHeight = 250
      break
    case 'profile':
      listTargetHeight = 250
      break
    case 'commentsSort':
      listTargetHeight = 100
      break
    default:
      listTargetHeight = 160
      break;
  }

  useFocusEffect(React.useCallback(() => {
    const onBackPress = () => {
      if (isShadowExpanded) {
        dispatch(collapseShadow())
        return true
      }
      return false
    }
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)
    return () => subscription.remove()
  }, [isShadowExpanded]))

  React.useEffect(() => {
    if (shouldPerformAnimation.current) {
      if (isShadowExpanded) {
        Animated.timing(listHeight, {
          toValue: listTargetHeight,
          duration: 200,
          useNativeDriver: false,
        }).start()
      } else {
        Animated.timing(listHeight, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start()
      }
    } else {
      shouldPerformAnimation.current = true
    }
  }, [isShadowExpanded])

  const openProfileRegistartionDate = () => {
    dispatch(collapseShadow())
    dispatch(expandShadow({dropdownType: 'none'}))
    dispatch(setUserForFetchingInfo({registrationDate: 0, name: data.name, imgUrl: data.imgUrl, userId: data.userId, isFetching: true, isOpen: true}))
    let profileDataRegUrl = `https://vkdia.com/pages/fake-vk-profile/registration-date?vkId=${data.userId}`;
    const re = /^\d*$/g; 
    if (data.userId > 0) {
      fetch(profileDataRegUrl)
      .then(response => response.json())
      .then(result => {
        const regDate = result.regDate 
        if (re.test(regDate)) {
          dispatch(
            setUserForFetchingInfo({
              name: data.name, 
              imgUrl: data.imgUrl, 
              userId: data.userId, 
              isFetching: false, 
              registrationDate: regDate, 
              isOpen: true,
            })
          )
        }
      })
    } else {
      dispatch(setUserForFetchingInfo({
        registrationDate: 0,
        name: '',
        imgUrl: 'banned',
        userId: vkId,
        isFetching: false,
      }))
    }
  }

  const addPostToFave = async () => {
    const url = `https://api.vk.com/method/fave.addPost?access_token=${accessToken}&v=5.131&owner_id=${data.owner_id ? data.owner_id : data.source_id}&id=${data.id ? data.id : data.post_id}${data.access_key ? `&access_key=${data.access_key}` : ''}`
    const response = await fetch(url)
    const parsedRes = await response.json()
    if (parsedRes.response === 1) {
      ToastAndroid.show('Added to Favorite!', ToastAndroid.SHORT)
    } else {
      ToastAndroid.show('Network Error', ToastAndroid.SHORT)
    }
    dispatch(collapseShadow())
  }

  const removePostFromFavorite = async () => {
    const url = `https://api.vk.com/method/fave.removePost?access_token=${accessToken}&v=5.131&owner_id=${data.owner_id ? data.owner_id : data.source_id}&id=${data.id ? data.id : data.post_id}${data.access_key ? `&access_key=${data.access_key}` : ''}`
    const response = await fetch(url)
    const parsedRes = await response.json()
    if (parsedRes.response === 1) {
      ToastAndroid.show('Removed from Fave!', ToastAndroid.SHORT)
    } else {
      ToastAndroid.show('Network Error', ToastAndroid.SHORT)
    }
    dispatch(collapseShadow())
  }
  const copyPostLink = async () => {
    await Clipboard.setStringAsync(`https://vk.com/wall${data.owner_id ? data.owner_id : data.source_id}_${data.id ? data.id : data.post_id}`)
    ToastAndroid.show('Copied!', ToastAndroid.SHORT)
    dispatch(collapseShadow())
  }

  const sortCommentsOldFirst = () => {
    if (commentsSortType === 'asc') {
      dispatch(collapseShadow())
    } else {
      // const func = data.setCommentsSortType 
      // func('desc')
      dispatch(collapseShadow())
      dispatch(setCommentsSortType())
    }
  }

  const sortCommentsNewFirst = () => {
    if (commentsSortType === 'desc') {
      dispatch(collapseShadow())
    } else {
      // const func = data.setCommentsSortType 
      // func('asc')
      dispatch(collapseShadow())
      dispatch(setCommentsSortType())
    }
  }

  

  if (dropdownType === 'post') {
    return (
      <Animated.View 
        style={[
        styles.postDropdownMenu,
        { 
          height: listHeight,   
        },
        isLightTheme ? 
        {backgroundColor: COLORS.white} :
        {backgroundColor: COLORS.very_dark_gray},
        {transform: [{translateX: dropdownData.dropdownX - 150}, {translateY: dropdownData.dropdownY}]}
      ]}>
        <TouchableOpacity style={styles.postDropdownMenuButton} onPress={data.is_favorite ? removePostFromFavorite : addPostToFave} activeOpacity={0.8}>
          <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>{data.is_favorite ? 'Remove from fave' : 'Add to Bookmarks'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postDropdownMenuButton}>
          <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Not interested</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postDropdownMenuButton} onPress={copyPostLink} activeOpacity={0.8}>
          <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Copy Link</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postDropdownMenuButton}>
          <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Report</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  } else if (dropdownType === 'group') {
    return (
      <Animated.View style={[
        styles.headerDropdown,
        {height: listHeight}, 
        isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor : COLORS.secondary},
        {transform: [{translateX: dropdownData.dropdownX - 180}, {translateY: dropdownData.dropdownY}]}
      ]}>
        <TouchableOpacity 
          style={[
            styles.headerDropdownOptionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]} 
        >
          <Text style={[styles.headerDropdownOption, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Add to Bookmarks</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.headerDropdownOptionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]} 
        >
          <Text style={[styles.headerDropdownOption, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Leave/Join Community</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.headerDropdownOptionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]} 
        >
          <Text style={[styles.headerDropdownOption, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Copy link</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.headerDropdownOptionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]} 
        >
          <Text style={[styles.headerDropdownOption, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Report</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  } else if (dropdownType === 'openPost') {
    return (
      <Animated.View style={[
        styles.headerDropdown,
        {height: listHeight}, 
        isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor : COLORS.secondary},
        {transform: [{translateX: dropdownData.dropdownX - 180}, {translateY: dropdownData.dropdownY}]}
      ]}>
        <TouchableOpacity 
          style={[
            styles.headerDropdownOptionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]} 
        >
          <Text style={[styles.headerDropdownOption, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Add to Bookmarks</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.headerDropdownOptionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]} 
        >
          <Text style={[styles.headerDropdownOption, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Leave/Join Community</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.headerDropdownOptionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]} 
        >
          <Text style={[styles.headerDropdownOption, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Copy link</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.headerDropdownOptionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]} 
        >
          <Text style={[styles.headerDropdownOption, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Report</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  } else if (dropdownType === 'videoListItem') {
    return (
      <Animated.View 
      style={[
      styles.postDropdownMenu,
      { 
        height: listHeight,   
      },
      isLightTheme ? 
      {backgroundColor: COLORS.white} :
      {backgroundColor: COLORS.very_dark_gray},
      {transform: [{translateX: dropdownData.dropdownX - 150}, {translateY: dropdownData.dropdownY}]}
    ]}>
      <TouchableOpacity style={styles.postDropdownMenuButton}>
        <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Add to Bookmarks</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postDropdownMenuButton}>
        <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Add to my videos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postDropdownMenuButton}>
        <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Add to playlist</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postDropdownMenuButton}>
        <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Copy Link</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postDropdownMenuButton}>
        <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postDropdownMenuButton}>
        <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Not interesting</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postDropdownMenuButton}>
        <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Report</Text>
      </TouchableOpacity>
    </Animated.View>)
  } else if (dropdownType === 'videoScreen') {
    return (
      <Animated.View 
      style={[
      styles.postDropdownMenu,
      { 
        height: listHeight,   
      },
      isLightTheme ? 
      {backgroundColor: COLORS.white} :
      {backgroundColor: COLORS.very_dark_gray},
      {transform: [{translateX: dropdownData.dropdownX - 150}, {translateY: dropdownData.dropdownY}]}
    ]}>
      <TouchableOpacity style={styles.postDropdownMenuButton}>
        <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Add to Bookmarks</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postDropdownMenuButton}>
        <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Add to my videos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postDropdownMenuButton}>
        <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Add to playlist</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postDropdownMenuButton}>
        <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Copy Link</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postDropdownMenuButton}>
        <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postDropdownMenuButton}>
        <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Not interesting</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postDropdownMenuButton}>
        <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Report</Text>
      </TouchableOpacity>
    </Animated.View>)
  } else if (dropdownType === 'profile') {
    return (
      <Animated.View style={[
        styles.headerDropdown,
        {height: listHeight}, 
        isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor : COLORS.secondary},
        {transform: [{translateX: dropdownData.dropdownX - 180}, {translateY: dropdownData.dropdownY}]}
      ]}>
        <TouchableOpacity 
          style={[
            styles.headerDropdownOptionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]} 
        >
          <Text style={[styles.headerDropdownOption, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Add to Bookmarks</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.headerDropdownOptionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]} 
        >
          <Text style={[styles.headerDropdownOption, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Leave/Join Community</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.headerDropdownOptionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]} 
        >
          <Text style={[styles.headerDropdownOption, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Copy link</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.headerDropdownOptionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]} 
        >
          <Text style={[styles.headerDropdownOption, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.headerDropdownOptionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]}
          onPress={openProfileRegistartionDate}
        >
          <Text style={[styles.headerDropdownOption, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Registration Date</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  } else if (dropdownType === 'commentsSort') {
    return (
      <Animated.View 
        style={[
          styles.commentsSortDropdown,
          { 
            height: listHeight,   
          },
          isLightTheme ? 
          {backgroundColor: COLORS.white} :
          {backgroundColor: COLORS.very_dark_gray},
          {transform: [{translateX: dropdownData.dropdownX - 73}, {translateY: dropdownData.dropdownY}]}
        ]}>
        <TouchableOpacity style={styles.commentsSortDropdownButton} activeOpacity={0.5} onPress={sortCommentsOldFirst}>
          <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Old</Text>
          {commentsSortType === 'asc' && <Feather name='check' size={20} color={COLORS.primary}/>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.commentsSortDropdownButton} activeOpacity={0.5} onPress={sortCommentsNewFirst}>
          <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>New</Text>
          {commentsSortType === 'desc' && <Feather name='check' size={20} color={COLORS.primary}/>}
        </TouchableOpacity>
      </Animated.View>
    )
  }
  return null
}

export default Dropdown

const styles = StyleSheet.create({
  postDropdownMenu: {
    borderRadius: 5,
    elevation: 5, 
    position: 'absolute', 
    zIndex: 5, 
    width: 170,
  },
  commentsSortDropdown: {
    borderRadius: 5,
    elevation: 5, 
    position: 'absolute', 
    zIndex: 5, 
    width: 110,
  },
  postDropdownMenuButton: {
    position: 'relative', 
    zIndex: 5, 
    flex: 1, 
    alignItems: 'flex-start', 
    justifyContent: 'center', 
    paddingLeft: 5  
  },
  commentsSortDropdownButton: {
    position: 'relative', 
    zIndex: 5, 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },
  headerDropdown: {
    zIndex: 5,
    position: 'absolute',
    elevation: 15,
    width: 200,
    borderRadius: 5,
  },
  headerDropdownOptionContainer: {
    width: '100%',
    // height: '50%',
    flex: 1,
    zIndex: 5,
    justifyContent: 'center',
    paddingLeft: 10,
    borderRadius: 5
  },
  headerDropdownOption: {
    fontSize: 18,
  },
})