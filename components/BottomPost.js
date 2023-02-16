import { StyleSheet, Text, View, TouchableOpacity, InteractionManager } from 'react-native'
import React, {useState, useCallback, memo} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from '../constants/theme'
import { getShortagedNumber } from '../utils/numShortage'
import { useDispatch } from 'react-redux'
import { setOpenedPost } from '../redux/newsSlice'

const BottomPost = ({dataComments, dataLikes, dataReposts, openedPost, navigation, data}) => {
    // const [commentsCount, setCommentsCount] = useState(dataComments?.count !== undefined ? dataComments.count : 0)
    const [likesCount, setLikesCount] = useState(dataLikes?.count !== undefined ? dataLikes.count : 0)
    // const [repostsCount, setRepostsCount] = useState(dataReposts?.count !== undefined ? dataReposts.count : 0)
    const [isLikePressed, setIsLikePressed] = useState(false)
    const dispatch = useDispatch()

    const handleLikePress = () => {
      if (!isLikePressed) {
        setIsLikePressed(true)
        setLikesCount(count => count + 1)
      } else {
        setIsLikePressed(false)
        setLikesCount(count => count - 1)
      }
    }

    const openComments = () => {
      if(openedPost) {
        dispatch(setOpenedPost(data))
        navigation.navigate('OpenPost')
      }
    }

    const result = (
      <View style={styles.postBottomContainer}>
        <View>
          <TouchableOpacity style={styles.buttonContainer} activeOpacity={1} onPress={openComments}>
            <MaterialCommunityIcons style={styles.iconButton} name='comment' color={COLORS.secondary} size={20}/>
            <Text style={styles.buttonText}>
              {getShortagedNumber(dataComments?.count !== undefined ? dataComments.count : 0)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomRightContainer}>
          <TouchableOpacity style={styles.buttonContainer}>
            <FontAwesome style={styles.iconButton} name='share' color={COLORS.secondary} size={20}/>
            <Text style={styles.buttonText}>
              {getShortagedNumber(dataReposts?.count !== undefined ? dataReposts.count : 0)}
            </Text>  
          </TouchableOpacity>  
          <TouchableOpacity style={styles.buttonContainer} activeOpacity={1} onPress={handleLikePress}>
            <AntDesign style={styles.iconButton} color={isLikePressed ? COLORS.primary : COLORS.secondary} name='like1' size={20} />
            <Text style={styles.buttonText}>{getShortagedNumber(likesCount)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
    return openedPost ? result : null
}

export default BottomPost

const styles = StyleSheet.create({
    postBottomContainer: {
        display: 'flex',
        paddingLeft: 0,
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
    },
})