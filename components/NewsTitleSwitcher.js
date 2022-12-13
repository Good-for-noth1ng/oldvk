import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import {Dropdown} from 'react-native-element-dropdown'

const NewsTitleSwitcher = () => {
    const newsOptions = [
        {label: 'News', value: '1'},
        {label: 'Recommended', value: '2'}
    ]
    return (
    <View>
      <Text>NewsTitleSwitcher</Text>
    </View>
  )
}

export default NewsTitleSwitcher

const styles = StyleSheet.create({})