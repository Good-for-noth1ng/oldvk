import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { memo } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { getShortagedNumber } from '../utils/numShortage'
import { getDuration } from '../utils/numShortage'
import { getTimeDate } from '../utils/date'
import { COLORS } from '../constants/theme'


const VideosListItem = ({title, duration, imageUrl, views, date, isLightTheme, navigation, playerUrl, ownerId, likes, reposts, isLiked, isReposted}) => {
  // let shortagedTitle = title.slice(0, 40).split(' ').slice(0, -1).join(' ')
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
      }
    )
  }

  return (
    <TouchableOpacity onPress={navigateToVideo} activeOpacity={0.8} style={[styles.mainContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
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
      <TouchableOpacity >
        <Feather name='more-vertical' color={COLORS.secondary} size={20}/>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default memo(VideosListItem)

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
    borderBottomRightRadius: 5,
    opacity: 0.8,
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
  }
})