import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { COLORS } from '../constants/theme'
//dataText
const PostText = ({dataText}) => {
    let postText = ''
    let readMoreText
    if (dataText !== undefined) {
        if (dataText.split(' ').length > 50) {
            postText = dataText.split(' ').slice(0, 50).join(' ')
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
    const handleReadMore = () => {
        setText(dataText)
        setReadMore(false)
    } 
    return (
        <TouchableOpacity 
            style={styles.textContainer}
            activeOpacity={1}
        >
            <Text>
                {text}
                {readMore ? '...' : ''}
            </Text>
            {readMore ? 
                    <TouchableOpacity 
                        onPress={handleReadMore} 
                        style={{width: '100%', height: 28}} 
                        activeOpacity={0.6}
                    >
                        <Text
                            style={styles.showMoreText}
                        >
                            {'Read more...'}
                        </Text>
                    </TouchableOpacity>
                    : null 
            }
        </TouchableOpacity>
  )
}

export default PostText

const styles = StyleSheet.create({
    showMoreText: {
        color: COLORS.primary,
        fontWeight: '700'
    }
})