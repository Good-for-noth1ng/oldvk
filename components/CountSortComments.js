import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { COLORS } from '../constants/theme'
const CountSortComments = ({commentsCount}) => {
  return (
    <View style={styles.countSortContainer}>
        <Text style={{color: COLORS.secondary}}>{commentsCount} {commentsCount > 1 ? 'COMMENTS' : 'COMMENT'}</Text>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: COLORS.primary, fontSize: 15}}>Ascending</Text>
            <FontAwesome color={COLORS.primary} style={{marginLeft: 4}} name='chevron-down'/>
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
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: COLORS.white
    }
})