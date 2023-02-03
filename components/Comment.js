import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { COLORS } from '../constants/theme'
import { getTimeDate } from '../utils/date'

const Comment = ({data}) => {
  const profiles = useSelector(state => state.comments.profiles)
  const [name, setName] = useState('')
  const [photoUrl, setPhotoUrl] = useState(null)

  useEffect(() => {
    console.log(data.date)
    profiles.forEach(item => {
      if (item.id === data.from_id) {
        setName(`${item.last_name} ${item.first_name}`);
        setPhotoUrl(item.photo_100);
      }
    })
  }, [])
  
  return (
    <View style={styles.commentContainer}>
      <View style={{marginRight: 7}}>
        <Image source={{uri: photoUrl}} style={{width: 38, height: 38, borderRadius: 100}}/>
      </View>
      <View style={{width: '86%'}}>
        <Text style={{fontWeight: '700', fontStyle: 'normal', fontSize: 14}}>{name}</Text>
        <Text>{data.text}</Text>
        <View>
          <Text>{getTimeDate(data.date)}</Text>
        </View>
      </View>
    </View>
  )
}

export default Comment

const styles = StyleSheet.create({
  commentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: COLORS.white
  },
  commentConentContainer: {

  }
})