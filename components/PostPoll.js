import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import PostPollVariant from './PostPollVariant'
import { COLORS } from '../constants/theme'

const PostPoll = ({ poll, accessToken, isLightTheme }) => {
  return (
    <View style={[
      {borderWidth: 1, borderRadius: 5, padding: 5, gap: 10}, 
      isLightTheme ? {borderColor: COLORS.light_smoke} : {borderColor: COLORS.secondary}
    ]}>
      <View>
        {
          poll.question && 
          <Text style={[styles.question, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>{poll.question}</Text>
        }
        <View style={styles.pollInfoContainer}>
          <Text style={styles.pollInfoText}>{poll.anonymous ? 'Anonymous poll' : 'Public poll'}</Text>
          <Entypo name='dot-single' size={20} color={COLORS.secondary}/>
          <Text style={styles.pollInfoText}>{poll.votes}</Text>
        </View>
      </View>
      {
        poll.answers.map(item => {
          return (
            <PostPollVariant 
              text={item.text} 
              rate={item.rate} 
              votes={item.votes} 
              id={item.id} 
              key={item.id}
              accessToken={accessToken}
              isLightTheme={isLightTheme}
            />
          )
        })
      }
    </View>
  )
}

export default PostPoll

const styles = StyleSheet.create({
  question: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  pollInfoContainer: {
    flexDirection: 'row'
  },
  pollInfoText: {
    fontSize: 14,
    color: COLORS.secondary
  }
})