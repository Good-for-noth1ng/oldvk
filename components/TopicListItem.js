import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

const TopicListItem = ({isLightTheme, title, postsNum, isClosed, id, groupId, navigation}) => {
  const navigateToTopic = () => {
    navigation.push('Topic', {groupId, topicId: id})
  }
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.background_dark}
      ]}
      activeOpacity={0.8}
      onPress={navigateToTopic}
    >
      <Text style={[styles.title, isLightTheme ? {color: COLORS.black} : {color: COLORS.primary_text}]}>
        {title}
      </Text>
      <Text style={styles.num}>
        {postsNum} {postsNum > 1 ? 'posts' : 'post'}{isClosed ? ', Topic closed' : ''}
      </Text>
    </TouchableOpacity>
  )
}

export default TopicListItem

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  num: {
    fontSize: 14,
    color: COLORS.secondary
  }
})