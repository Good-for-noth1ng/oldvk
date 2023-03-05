import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, memo } from 'react'
import { COLORS } from '../constants/theme'
import { getHyperlinkInText } from '../utils/hyperlinks'
//dataText
const PostText = ({dataText, toOpen}) => {
  let postText = ''
  let readMoreText
  if (dataText !== undefined) {
    if (dataText.split(' ').length > 50 && toOpen) {
      postText = dataText.split(' ').slice(0, 70).join(' ')
      readMoreText = true
    } else {
      readMoreText = false
      postText = dataText
    }
  } else {
    postText = ''
    readMoreText = false
  }
  const [text, setText] = useState(postText)
  const [readMore, setReadMore] = useState(readMoreText)
  const handleReadMore = useCallback(() => {
    setText(dataText)
    setReadMore(false)
  }, [])
   
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>
        {getHyperlinkInText(text)}
        {readMore ? '...' : ''}
      </Text>
        {readMore ? 
          <TouchableOpacity 
            onPress={handleReadMore} 
            style={{width: '100%', height: 28}} 
            activeOpacity={0.6}
          >
            <Text style={styles.showMoreText}>
              {'Read more...'}
            </Text>
          </TouchableOpacity>
        : null}
    </View>
  )
}

export default memo(PostText)

const styles = StyleSheet.create({
    showMoreText: {
        color: COLORS.primary,
        fontWeight: '700'
    },
    text: {
      fontSize: 15
    }
})