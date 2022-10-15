import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { COLORS } from '../constants/theme'

const PostText = ({data}) => {
    let postText = ''
    let readMoreText
    if (data.text !== undefined) {
        if (data.text.split(' ').length > 50) {
            postText = data.text.split(' ').slice(0, 50).join(' ')
            readMoreText = true
        } else {
            readMoreText = false
            postText = data.text
        }
    } else {
        postText = ''
        readMoreText = false
    }
    const [text, setText] = useState(postText)
    const [readMore, setReadMore] = useState(readMoreText)
    const handleReadMore = () => {
        setText(data.text)
        setReadMore(false)
    } 
    return (
        <View style={styles.textContainer}>
            <Text>
                {text}
                <Text
                    style={styles.showMoreText}
                    onPress={handleReadMore}
                >
                    {readMore ? '\nRead more' : ''}
                </Text>
            </Text>
        </View>
  )
}

export default PostText

const styles = StyleSheet.create({
    showMoreText: {
        color: COLORS.primary,
        fontWeight: '700'
    },
    textContainer: {
        marginBottom: 0
    }
})