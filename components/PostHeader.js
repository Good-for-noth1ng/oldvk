import { StyleSheet, Text, View, Image, TouchableOpacity, InteractionManager } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../constants/theme'
import { getTimeDate } from '../utils/date'

const PostHeader = ({dataDate, isRepost, navigation, isLightTheme, onMorePress, isPinned, author, ownerId}) => {  
  
  const name = author?.name ? author?.name : `${author?.first_name} ${author?.last_name}`
  const imgUrl = author?.photo_100

  const openGroup = () => {
    if (author.name) {
      navigation.push('Group', {groupId: author.id})
    } else {
      navigation.push('UserProfile', { userId: author.id})
    }
    // if (ownerId < 0) {
    //   // dispatch(setGroupID(wallId))
    //   navigation.push('Group', {groupId: (-1 * ownerId)})
    // } else {
    //   // dispatch(setUserID(wallId))
    //   navigation.push('UserProfile', {userId: ownerId})
    // }
  }
  
  let postNameTextStyle;
  let postTimeTextStyle;
  if (isRepost) {
    postNameTextStyle = isLightTheme ? styles.postNameTextRepostLight : styles.postNameTextRepostDark; 
    postTimeTextStyle = isLightTheme ? styles.postTimeTextRepostLight : styles.postTimeTextRepostDark;
  } else {
    postNameTextStyle = isLightTheme ? styles.postNameTextLight : styles.postNameTextDark;
    postTimeTextStyle = isLightTheme ? styles.postTimeTextLight : styles.postNameTextDark;
  }
  

  return (
    <View style={styles.postHeaderContainer}>
      <TouchableOpacity onPress={openGroup} style={isRepost ? styles.postHeaderLeftsideContainerRepost : styles.postHeaderLeftsideContainer}>
        {isRepost ? <Feather name='corner-up-right' size={20} style={styles.repostIcon} color={COLORS.secondary}/> : null}
        <Image 
          style={isRepost ? styles.postImageSourceRepost : styles.postImageSource} 
          source={{
            uri: imgUrl 
          }}
        />
        <View style={styles.sourceNameContainer}>
          <View style={isRepost ? styles.postNameContainerRepost : styles.postNameContainer}>
            <Text style={postNameTextStyle}>
              {name}
            </Text>
            {
              isPinned &&
              <View style={{transform: [{rotateY: '180deg'}]}}>
                <AntDesign name='pushpin' color={COLORS.secondary} size={15}/>
              </View>
            }
          </View>
          <Text style={postTimeTextStyle}>
            {getTimeDate(dataDate)}
          </Text>
        </View>
      </TouchableOpacity>
      {
        !isRepost &&
        <>
          <TouchableOpacity 
            pressRetentionOffset={10} 
            style={styles.postHeaderRightsideContainer} 
            onPress={() => onMorePress()}
          >
            <Feather name='more-vertical' size={20} color={COLORS.secondary}/>
          </TouchableOpacity>
        </>
      }    
    </View>
  )
}

export default PostHeader

const styles = StyleSheet.create({
    postHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
        // width: '150%',
        // backgroundColor: COLORS.secondary
      },
      postNameContainerRepost: {
        // width: 230,
        width: 255,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
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