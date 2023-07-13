import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PersonalListItem from './PersonalListItem'
import { COLORS } from '../constants/theme'

const WallHeaderAdditionalInfo = ({description}) => {
  return (
    <View style={styles.container}>
      {
        description ?
        <PersonalListItem title={'description'} info={description}/> : null 
      }
    </View>
  )
}

export default WallHeaderAdditionalInfo

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background_dark,
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  }
})