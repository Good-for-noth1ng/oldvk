import { StyleSheet, Text, View, Animated, TouchableOpacity, ToastAndroid, BackHandler } from 'react-native'
import React from 'react'
import * as Clipboard from 'expo-clipboard'
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import { expandShadow, collapseShadow } from '../redux/globalShadowSlice'
import { COLORS } from '../constants/theme'

const Dropdown = ({ isLightTheme, accessToken }) => {
  const dispatch = useDispatch()
  const dropdownData = useSelector(state => state.globalShadow)
  const isShadowExpanded = dropdownData.isOpen
  const data = dropdownData.data
  const dropdownType = dropdownData.dropdownType
  const shouldPerformAnimation = React.useRef(false)
  const listHeight = React.useRef(new Animated.Value(0)).current
  let listTargetHeight
  
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
      listTargetHeight = 200
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

  const copyPostLink = async () => {
    await Clipboard.setStringAsync(`https://vk.com/wall${data.owner_id ? data.owner_id : data.source_id}_${data.id ? data.id : data.post_id}`)
    ToastAndroid.show('Copied!', ToastAndroid.SHORT)
    dispatch(collapseShadow())
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
        <TouchableOpacity style={styles.postDropdownMenuButton} onPress={addPostToFave} activeOpacity={0.8}>
          <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Add to Bookmarks</Text>
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
  postDropdownMenuButton: {
    position: 'relative', 
    zIndex: 5, 
    flex: 1, 
    alignItems: 'flex-start', 
    justifyContent: 'center', 
    paddingLeft: 5  
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