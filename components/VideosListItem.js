import { StyleSheet, Text, View, TouchableOpacity, Image, ToastAndroid, LayoutAnimation } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import * as Clipboard from 'expo-clipboard'
import { useDispatch } from 'react-redux'
import { getShortagedNumber } from '../utils/numShortage'
import { getDuration } from '../utils/numShortage'
import { getTimeDate } from '../utils/date'
import { COLORS } from '../constants/theme'
import { expandShadow, collapseShadow } from '../redux/globalShadowSlice'

const VideosListItem = ({title, duration, imageUrl, views, date, isLightTheme, navigation, playerUrl, ownerId, likes, reposts, isLiked, isReposted, id, canLike, canAdd, canAddToFavs, commentsCount, canComment, videoId}) => {
  const dispatch = useDispatch()
  const [dropdownMenuHeight, setDropdownMenuHeight] = React.useState(0)
  const [videoListItemZIndex, setVideoListItemZIndex] = React.useState(0)
  let shortagedTitle = title.slice(0, 40)
  if (shortagedTitle !== title) {
    shortagedTitle += '...'
  }

  const navigateToVideo = () => {
    navigation.push(
      'Video', 
      {
        playerUrl: playerUrl, 
        title: title, 
        views: views, 
        ownerId: ownerId, 
        likes: likes, 
        reposts: reposts, 
        isLiked: isLiked, 
        isReposted: isReposted, 
        date: date,
        canAdd,
        canAddToFavs,
        canComment,
        canLike,
        commentsCount,
        videoId
      }
    )
  }

  const onShadowPressCallback = (initValue) => {
    setDropdownMenuHeight(initValue)
    setVideoListItemZIndex(initValue)
  }

  const onMorePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setVideoListItemZIndex(4)
    setDropdownMenuHeight(160)
    dispatch(expandShadow(onShadowPressCallback))
  }

  const onShadowPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setDropdownMenuHeight(0)
    dispatch(collapseShadow())
  }

  return (
    <TouchableOpacity onPress={navigateToVideo} activeOpacity={0.8} style={[styles.mainContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}, {zIndex: videoListItemZIndex}]}>
      <View style={styles.imageContainer}>
        <Image source={{uri: imageUrl}} style={{width: '100%', height: '100%', borderRadius: 5}}/>
        <Text style={styles.timeDuration}>{getDuration(duration)}</Text>
      </View>
      <View style={{justifyContent: 'space-between'}}>
        <Text style={[styles.title, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>{shortagedTitle}</Text>
        <View>
          <Text style={styles.views}>{getShortagedNumber(views)} views</Text>
          <Text style={styles.date}>{getTimeDate(date)}</Text>
        </View>
      </View>
      {/* <TouchableOpacity activeOpacity={0.8} onPress={onMorePress}>
        <Feather name='more-vertical' color={COLORS.secondary} size={20}/>
      </TouchableOpacity>
      <View 
        style={[
        styles.dropdownMenu,
        { 
          height: dropdownMenuHeight,   
        },
        isLightTheme ? 
        {backgroundColor: COLORS.white} :
        {backgroundColor: COLORS.very_dark_gray}
      ]}>
          <TouchableOpacity style={styles.dropdownMenuButton}>
            <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Add to Bookmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownMenuButton}>
            <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Not interested</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownMenuButton}>
            <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Copy Link</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownMenuButton}>
            <Text style={[{fontSize: 17}, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Report</Text>
          </TouchableOpacity>
      </View> */}
    </TouchableOpacity>
  )
}

export default React.memo(VideosListItem, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
})

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    gap: 5,
    paddingLeft: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  timeDuration: {
    position: 'absolute', 
    zIndex: 3, 
    color: COLORS.white, 
    backgroundColor: COLORS.light_black, 
    borderRadius: 5,
    opacity: 0.8,
    right: 5,
    bottom: 5,
    padding: 3,
    fontSize: 15
  },
  imageContainer: {
    width: 150, 
    height: 90, 
    borderRadius: 5, 
    justifyContent: 'flex-end', 
    alignItems: 'flex-end',
  },
  title: {
    width: 155,
    height: 55,
    fontSize: 15,
    fontWeight: 'bold',
    // backgroundColor: COLORS.secondary
  },
  views: {
    color: COLORS.secondary
  },
  date: {
    color: COLORS.secondary
  },
  dropdownMenu: {
    left: '50%', 
    top: 10,
    borderRadius: 5,
    elevation: 4, 
    position: 'absolute', 
    zIndex: 5, 
    width: 170,
  },
  dropdownMenuButton: {
    position: 'relative', 
    zIndex: 4, 
    flex: 1, 
    alignItems: 'flex-start', 
    justifyContent: 'center', 
    paddingLeft: 5  
  }
})