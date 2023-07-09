import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { COLORS } from '../constants/theme'
import { getTimeDate } from '../utils/date'

const VideoHeader = ({ ownerId, date, isLightTheme, accessToken }) => {
  const [name, setName] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  
  const fetchAuthroInfo = async () => {
    if (ownerId > 0) {
      const url = `https://api.vk.com/method/users.get?access_token=${accessToken}&v=5.131&fields=photo_100&user_ids=${ownerId}`
      const response = await fetch(url)
      const data = await response.json()
    //   console.log(data)
      setName(`${data.response[0].first_name} ${data.response[0].last_name}`)
      setImgUrl(data.response[0].photo_100)
    } else {
      const url = `https://api.vk.com/method/groups.getById?access_token=${accessToken}&v=5.131&fields=photo_100&group_id=${-1 * ownerId}`
      const response = await fetch(url)
      const data = await response.json()
    //   console.log(data)
      setName(data.response[0].name)
      setImgUrl(data.response[0].photo_100)
    }
  }
  useEffect(() => {
    fetchAuthroInfo()
  }, [])
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.vidPubContainer}>
        <Image source={{uri: imgUrl}} style={styles.image}/>
        <View>
          <Text style={[styles.name, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>{name}</Text>
          <Text style={styles.date}>{getTimeDate(date)}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.actionsContainer}>
        <TouchableOpacity>
          <Feather name='user-plus' size={23} color={COLORS.secondary}/>  
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name='more-vertical' size={23} color={COLORS.secondary}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default VideoHeader

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  vidPubContainer: {
    flexDirection: 'row',
    gap: 10
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 5
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  date: {
    color: COLORS.secondary
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 10
  }
})