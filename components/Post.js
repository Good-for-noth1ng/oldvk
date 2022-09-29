import { StyleSheet, Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import { COLORS } from '../constants/theme'
import { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'

const Post = ({data}) => {
  const [isPressed, setIsPressed] = useState(false)
  const hadnleLikePress = () => {
    setIsPressed(!isPressed)
  }
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeaderContainer}>
        <View style={styles.postHeaderLeftsideContainer}></View>
        <View style={styles.postHeaderRightsideContainer}>
          <Feather name='more-vertical' size={20} color={COLORS.secondary}/>
        </View>
      </View>
      <View style={styles.postTextContainer}>
        <Text>
          {data.text}
        </Text>
      </View>
      <View style={styles.attachmentsContainer}></View>
      <View style={styles.postBottomContainer}>
        <View>
          <MaterialCommunityIcons name='comment' color={COLORS.secondary} size={20}/>
        </View>
        <View style={styles.bottomRightContainer}>
          <FontAwesome name='share' color={COLORS.secondary} size={20}/>
          <AntDesign name='like1' color={!isPressed ? COLORS.secondary : COLORS.primary} size={20} onPress={hadnleLikePress}/>
        </View>
      </View>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  postContainer: {
    margin: 4,
    padding: 10,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  postHeaderContainer: {},
  postHeaderLeftsideContainer: {},
  postHeaderRightsideContainer: {},
  postTextContainer: {},
  attachmentsContainer: {},
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
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})