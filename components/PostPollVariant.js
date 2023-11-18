import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

const PostPollVariant = ({ isLightTheme, id, rate, text, votes, ownerId, accessToken, pollId }) => {
  
  return (
    <TouchableOpacity style={[styles.answ, {backgroundColor: COLORS.light_blue}]} activeOpacity={0.8}>
      <View style={[styles.voted, {backgroundColor: COLORS.primary},  rate ? {width: `${rate}%`} : {width: 0}]}/>
      <View style={styles.voteContainer}>
        <Text style={[
          styles.optionText,
          // isLightTheme ? {color: COLORS.black} : {color: COLORS.primary_text}
        ]}>{text}</Text>
        <Text>{Math.round(rate)} %</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PostPollVariant

const styles = StyleSheet.create({
  answ: {
    flexDirection: 'row',
    width: '100%',
    minHeight: 35,
    // height: 100,
    flex: 1,
    borderRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  voteContainer: {
    position: 'relative', 
    zIndex: 2, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '100%',
    height: '100%',
    paddingLeft: 10, 
    paddingRight: 10
  },
  optionText: {
    fontSize: 15,
    width: '85%',
    // height: 100
  },
  voted: {
    height: '100%',
    borderRadius: 5,
    position: 'absolute',
    zIndex: 1,
    opacity: 0.8
  }
})