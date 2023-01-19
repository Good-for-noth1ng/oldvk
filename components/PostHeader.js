import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import { COLORS } from '../constants/theme'

const PostHeader = ({sourceId, dataDate, isRepost}) => {       
    const months = [
      'January', 'February', 'March', 'April', 
      'May', 'June', 'Jule', 'August', 'September', 
      'October', 'November', 'December'
    ]
    const nowDate = new Date()
    const nowYear = nowDate.getFullYear()
    const date = new Date(dataDate * 1000)
    let monthDate = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    let month = date.getMonth()
    // for (let i = 0; i < 12; i++) {
    //   if (month == i + 1) {
    //     month = months[i + 1]
    //   }
    // }
    month = months[month]
    let year = date.getFullYear()

    let groupData = {}
    let profileData = {}
    if (sourceId < 0) {
        groupData = useSelector(state => state.news.groups.find(group => group.id === 0 - sourceId))
    } else {
        profileData = useSelector(state => state.news.profiles.find(profile => profile.id === sourceId))
    }
    const [group, setGroup] = useState(groupData)
    const [profile, setProfile] = useState(profileData)

    return (
        <View style={styles.postHeaderContainer}>
            <View style={isRepost ? styles.postHeaderLeftsideContainerRepost : styles.postHeaderLeftsideContainer}>
                <Image 
                  style={isRepost ? styles.postImageSourceRepost : styles.postImageSource} 
                  source={{uri: group ? group.photo_100 : profile.photo_100}}
                />
                <View style={styles.sourceNameContainer}>
                    <View style={isRepost ? styles.postNameContainerRepost : styles.postNameContainer}>
                        <Text style={isRepost ? styles.postNameTextRepost : styles.postNameText }>
                          {group ? group.name : profile.last_name + ' ' + profile.first_name}
                        </Text>
                    </View>
                    <Text style={isRepost ? styles.postTimeTextRepost : styles.postTimeText}>
                      {monthDate} {month} {hours}:{minutes} {nowYear !== year ? year : ''}
                    </Text>
                </View>
            </View>
            {
              !isRepost &&
              <View style={styles.postHeaderRightsideContainer}>
                <Feather name='more-vertical' size={20} color={COLORS.secondary}/>
              </View>
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
        // marginBottom: 12,
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
      postNameText: {
        fontSize: 16,
        fontWeight: '600'
      },
      postNameTextRepost: {
        fontSize: 14,
        fontWeight: '600'
      },
      postTimeText: {
        fontSize: 14,
        fontWeight: '600'
      },
      postTimeTextRepost: {
        fontSize: 12,
        fontWeight: '600'
      }
})