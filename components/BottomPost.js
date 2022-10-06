import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from '../constants/theme'

const BottomPost = ({data}) => {
    let commentsCount = 0
    if (data.comments !== undefined) {
        commentsCount = data?.comments?.count
        if (commentsCount >= 1000) {
            commentsCount = Math.floor(commentsCount / 1000)
            commentsCount = String(commentsCount).concat('k')
        }
    }
    const [comments, setComments] = useState(commentsCount)
    
    let likesCount = 0
    if (data.likes !== undefined) {
        likesCount = data?.likes?.count
        if (likesCount >= 1000) {
            likesCount = Math.floor(likes / 1000)
            likesCount = String(likes).concat('k')
        }
    }
    const [likes, setLikes] = useState(likesCount)

    let repostsCount = 0
    if (data.reposts !== undefined) {
        repostsCount = data?.reposts?.count
        if (repostsCount >= 1000) {
            repostsCount = Math.floor(repostsCount / 1000)
            repostsCount= String(repostsCount).concat('k')
        }
    }
    const [reposts, setReposts] = useState(repostsCount)
    const [isLikePressed, setIsLikePressed] = useState(false)
    const handleLikePress = () => {
        if (!isLikePressed) {
            setIsLikePressed(true)
            setLikes(likes + 1)
        } else {
            setIsLikePressed(false)
            setLikes(likes - 1)
        }
    }
    return (
        <View style={styles.postBottomContainer}>
            <View>
                <TouchableOpacity style={styles.buttonContainer} activeOpacity={1}>
                    <MaterialCommunityIcons style={styles.iconButton} name='comment' color={COLORS.secondary} size={20}/>
                    <Text style={styles.buttonText}>{comments}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomRightContainer}>
                <TouchableOpacity style={styles.buttonContainer}>
                    <FontAwesome style={styles.iconButton} name='share' color={COLORS.secondary} size={20}/>
                    <Text style={styles.buttonText}>{reposts}</Text>  
                </TouchableOpacity>
            
                <TouchableOpacity style={styles.buttonContainer} activeOpacity={1} onPress={handleLikePress}>
                    <AntDesign style={{marginRight: 3}} color={isLikePressed ? COLORS.primary : COLORS.secondary} name='like1' size={20} />
                    <Text style={styles.buttonText}>{likes}</Text>
                </TouchableOpacity>
            </View>
    </View>
  )
}

export default BottomPost

const styles = StyleSheet.create({
    postBottomContainer: {
        display: 'flex',
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bottomRightContainer: {
        display: 'flex',
        width: '33%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonText: {
        marginLeft: 3,
        color: COLORS.secondary
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 30,
        // backgroundColor: COLORS.smoke
      },
    iconButton: {
        marginRight: 3,
        color: COLORS.secondary
    },
})