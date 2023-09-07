import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { COLORS } from '../constants/theme'
 
const CountSortComments = ({comments, isLightTheme}) => {
  const [commentsCount, setCommentsCount] = useState(comments !== undefined ? comments : 0)
  return (
    <View style={[styles.countSortContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
        <Text style={{fontSize: 14, color: COLORS.secondary}}>
          {commentsCount} {commentsCount > 1 || commentsCount == 0 ? 'COMMENTS' : 'COMMENT'}
        </Text>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={{color: COLORS.primary, fontSize: 15}}>Old</Text>
          </TouchableOpacity>         
          <FontAwesome color={COLORS.primary} name='chevron-down'/>
        </View>
    </View>
  )
}

export default CountSortComments

const styles = StyleSheet.create({
  countSortContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 7,
    paddingRight: 7,
  },
})