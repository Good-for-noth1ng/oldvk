import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
import { useDispatch } from 'react-redux'
import { setID } from '../redux/groupSlice'
import { getShortagedNumber } from '../utils/numShortage'

const GroupListItem = ({data, navigation, isLightTheme}) => {
  const dispatch = useDispatch()
    
  let name = data.name.slice(0,27)
  if (name !== data.name) {
    name += '...'
  }
  const handleOnPress = () => {
    dispatch(setID(data.id))
    navigation.navigate('Group')
  }
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={handleOnPress} 
      style={isLightTheme ? styles.groupIitemContainerLight : styles.groupIitemContainerDark}
    >
      <Image source={{uri:data.photo_100}} style={styles.image}/>
      <View style={styles.nameAndFollowersContainer}>
        <Text style={isLightTheme ? styles.groupNameLight : styles.groupNameDark}>{name}</Text>
        <Text style={isLightTheme ? styles.additionalInfoLight : styles.additionalInfoDark}>
          {data.activity}, {getShortagedNumber(data.members_count)} followers
        </Text>
      </View>  
    </TouchableOpacity>
  )
}

export default GroupListItem

const styles = StyleSheet.create({
  groupIitemContainerLight: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: COLORS.white,
  },
  groupIitemContainerDark: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: COLORS.primary_dark,
  },
  image: {
    width: 50, 
    height: 50,
    borderRadius: 5
  },
  groupNameLight: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.black
  },
  groupNameDark: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.primary_text
  },
  additionalInfoLight: {
    color: COLORS.black
  },
  additionalInfoDark: {
    color: COLORS.primary_text
  },
  nameAndFollowersContainer: {
    marginLeft: 12
  },
})