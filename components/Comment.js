import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'

const Comment = ({data}) => {
  const profiles = useSelector(state => state.comments.profiles)
  console.log(profiles)
  return (
    <View>
      <View>
        <Image />
      </View>
      <View>
        <Text>{}</Text>
        <Text>{data.text}</Text>
        <View>

        </View>
      </View>
    </View>
  )
}

export default Comment

const styles = StyleSheet.create({})