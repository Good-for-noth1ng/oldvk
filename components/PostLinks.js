import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const PostLinks = ({postLinks}) => {
  const postLink = postLinks[0]
  const url = postLink.url
  const title = postLink.title
  const lastIndex = postLink.sizes.length - 1
  const photoUrl = postLink.sizes[lastIndex].url
  return (  
    <TouchableOpacity activeOpacity={1} style={styles.linkContainer}>
      <Image source={{uri: photoUrl}} style={styles.linkImageBackground}/>
      <View>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PostLinks

const styles = StyleSheet.create({
  linkContainer: {
    display: 'flex',
    width: '100%',
    height: 300
  },  
  linkImageBackground: {
    width: '100%',
    height: '100%'
  }
})