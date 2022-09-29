import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Post = ({data}) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeaderContainer}>
        <View style={styles.postHeaderLeftsideContainer}></View>
        <View style={styles.postHeaderRightsideContainer}></View>
      </View>
      <View style={styles.postTextContainer}>
        <Text>
          {data.text}
        </Text>
      </View>
      <View style={styles.attachmentsContainer}></View>
      <View style={styles.postBottomContainer}></View>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  postContainer: {},
  postHeaderContainer: {},
  postHeaderLeftsideContainer: {},
  postHeaderRightsideContainer: {},
  postTextContainer: {},
  attachmentsContainer: {},
  postBottomContainer: {}
})