import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { collapseShadow, expandShadow } from '../redux/globalShadowSlice'
import { COLORS } from '../constants/theme'


const CountSortComments = ({ comments, isLightTheme, commentsSortType, setCommentsSortType }) => {
  const dispatch = useDispatch()
  const dropdownCoords = React.useRef()

  const [commentsCount, setCommentsCount] = React.useState(comments !== undefined ? comments : 0)

  const openDropdownMenu = () => {
    dropdownCoords.current.measure(
      (x, y, width, height, pageX, pageY) => {
        dispatch(expandShadow({dropdownX: pageX, dropdownY: pageY, data: null, dropdownType: 'commentsSort'}))
      }
    )
  }
  
  return (
    <View style={[styles.countSortContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
        <Text style={{fontSize: 14, color: COLORS.secondary}}>
          {commentsCount} {commentsCount > 1 || commentsCount == 0 ? 'COMMENTS' : 'COMMENT'}
        </Text>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <TouchableOpacity activeOpacity={0.8} onPress={openDropdownMenu}>
            <View ref={dropdownCoords}>
              <Text style={{color: COLORS.primary, fontSize: 15}}>{commentsSortType === 'asc' ? 'Old' : 'New'}</Text>
            </View>
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