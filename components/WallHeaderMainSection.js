import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import WallHeaderMainSectionItem from './WallHeaderMainSectionItem'

// photos videos
const WallHeaderMainSection = ({ section, data }) => {
  const renderItem = () => {

  }

  return (
    <View>
      <FlatList 
        horizontal={true}
      />
    </View>
  )
}

export default WallHeaderMainSection

const styles = StyleSheet.create({})