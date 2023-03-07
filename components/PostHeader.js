import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import { COLORS } from '../constants/theme'
import { getTimeDate } from '../utils/date'
import { setID } from '../redux/groupSlice'
const PostHeader = ({sourceId, dataDate, isRepost, isCommunityContent, isProfileContent, from_id, navigation, isLightTheme}) => {  
  // if (isRepost) {console.log(sourceId, from_id)}     
  const dispatch = useDispatch()
  let groupData = {}
  let profileData = {}
  let communityId
  if (sourceId === undefined) {
    communityId = from_id
  } else {
    communityId = sourceId
  }
  if (communityId < 0) {
    groupData = useSelector(state => state.news.groups.find(group => group.id === 0 - communityId))
    if (groupData === undefined) {
      groupData = useSelector(state => state.group.groups.find(group => group.id === 0 - communityId))
    }
  } else if (communityId > 0) {
    profileData = useSelector(state => state.news.profiles.find(profile => profile.id === communityId))
    if (groupData === undefined) {
      profileData = useSelector(state => state.group.profiles.find(profile => profile.id === 0 - communityId))
    }
  }
  const [group, setGroup] = useState(groupData)
  const [profile, setProfile] = useState(profileData)
  const openGroup = () => {
    sourceId !== undefined ? dispatch(setID(sourceId)) : dispatch(setID(from_id))
    navigation.navigate('Group')
  }
  
  let postNameTextStyle;
  let postTimeTextStyle;
  if (isRepost) {
    postNameTextStyle = !isLightTheme ? styles.postNameTextRepostLight : styles.postNameTextRepostDark; 
    postTimeTextStyle = !isLightTheme ? styles.postTimeTextRepostLight : styles.postTimeTextRepostDark;
  } else {
    postNameTextStyle = !isLightTheme ? styles.postNameTextLight : styles.postNameTextDark;
    postTimeTextStyle = !isLightTheme ? styles.postTimeTextLight : styles.postNameTextDark;
  }
  return (
    <View style={styles.postHeaderContainer}>
      <TouchableOpacity onPress={openGroup} style={isRepost ? styles.postHeaderLeftsideContainerRepost : styles.postHeaderLeftsideContainer}>
        {isRepost ? <Feather name='corner-up-right' size={20} style={styles.repostIcon} color={COLORS.secondary}/> : null}
        <Image 
          style={isRepost ? styles.postImageSourceRepost : styles.postImageSource} 
          source={{uri: group ? group.photo_100 : profile.photo_100}}
        />
        <View style={styles.sourceNameContainer}>
          <View style={isRepost ? styles.postNameContainerRepost : styles.postNameContainer}>
            <Text style={postNameTextStyle}>
              {group ? group.name : profile.last_name + ' ' + profile.first_name}
            </Text>
          </View>
          <Text style={postTimeTextStyle}>
            {getTimeDate(dataDate)}
          </Text>
        </View>
      </TouchableOpacity>
      {
        !isRepost &&
        <View style={styles.postHeaderRightsideContainer}>
          <Feather name='more-vertical' size={20} color={COLORS.secondary}/>
        </View>
      }    
    </View>
  )
}

export default memo(PostHeader)

const styles = StyleSheet.create({
    postHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      postHeaderLeftsideContainer: {
        display: 'flex',
        width: '90%',
        // padding: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      postHeaderLeftsideContainerRepost: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
      },
      postHeaderRightsideContainer: {
        // marginLeft: 10, 
        // backgroundColor: COLORS.secondary
      },
      postNameContainer: {
        width: 230,
        // width: '150%',
        // backgroundColor: COLORS.secondary
      },
      postNameContainerRepost: {
        // width: 230,
        width: 255,
        // backgroundColor: COLORS.secondary
      },
      postImageSource: {
        width: 50,
        height: 50,
        borderRadius: 4
      },
      postImageSourceRepost: {
        width: 40,
        height: 40,
        borderRadius: 4
      },
      sourceNameContainer: {
        marginLeft: 10,
        // display: 'flex',
        // alignItems: 'flex-end',
        // backgroundColor: COLORS.secondary
      },
      postNameTextLight: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.black
      },
      postNameTextDark: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.primary_text
      },
      postNameTextRepostLight: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.black
      },
      postNameTextRepostDark: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primary_text
      },
      postTimeTextLight: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.black
      },
      postTimeTextDark: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primary_text
      },
      postTimeTextRepostLight: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.black
      },
      postTimeTextRepostDark: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.primary_text
      },
      repostIcon: {
        marginRight: 5
      }
})