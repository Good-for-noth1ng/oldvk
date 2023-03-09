import { StyleSheet, Text, View } from 'react-native'
import React, { useState} from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { COLORS } from '../constants/theme'
const CountSortComments = ({comments, isLightTheme}) => {
  const [commentsCount, setCommentsCount] = useState(comments !== undefined ? comments : 0)
  return (
    <View style={isLightTheme ? styles.countSortContainerLight : styles.countSortContainerDark}>
        <Text style={{color: COLORS.secondary}}>
          {commentsCount} {commentsCount > 1 || commentsCount == 0 ? 'COMMENTS' : 'COMMENT'}
        </Text>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: COLORS.primary, fontSize: 15}}>Ascending</Text>
          <FontAwesome color={COLORS.primary} style={{marginLeft: 4}} name='chevron-down'/>
        </View>
    </View>
  )
}

export default CountSortComments

const styles = StyleSheet.create({
  countSortContainerLight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: COLORS.white
  },
  countSortContainerDark: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: COLORS.primary_dark
  }
})