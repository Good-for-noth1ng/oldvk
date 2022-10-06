import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import { COLORS } from '../constants/theme'
const PostHeader = ({data}) => {
    const date = new Date(data.date * 1000).toLocaleDateString()
        
    let groupData = {}
    let profileData = {}
    if (data.source_id < 0) {
        groupData = useSelector(state => state.news.groups.find(group => group.id === 0 - data.source_id))
    } else {
        profileData = useSelector(state => state.news.profiles.finde(profile => profile.id === data.source_id))
    }
    const [group, setGroup] = useState(groupData)
    const [profile, setProfile] = useState(profileData)
    return (
        <View style={styles.postHeaderContainer}>
            <View style={styles.postHeaderLeftsideContainer}>
                <Image style={styles.postImageSource} source={{uri: group ? group.photo_100 : profile.photo_100}}/>
                <View style={styles.sourceNameContainer}>
                    <View style={styles.postNameContainer}>
                        <Text style={styles.postNameText}>{group ? group.name : profile.last_name + ' ' + profile.first_name}</Text>
                    </View>
                    <Text>{date}</Text>
                </View>
            </View>
            <View style={styles.postHeaderRightsideContainer}>
                <Feather name='more-vertical' size={20} color={COLORS.secondary}/>
            </View>
        </View>
    )
}

export default PostHeader

const styles = StyleSheet.create({
    postHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12
      },
      postHeaderLeftsideContainer: {
        display: 'flex',
        width: '90%',
        // padding: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        // backgroundColor: COLORS.smoke
      },
      postHeaderRightsideContainer: {
        // marginLeft: 10, 
        // backgroundColor: COLORS.secondary
      },
      postNameContainer: {
        width: 230,
        // backgroundColor: COLORS.secondary
      },
      postImageSource: {
        width: 50,
        height: 50,
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
      }
})