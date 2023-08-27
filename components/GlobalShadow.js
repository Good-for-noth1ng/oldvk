import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { collapseShadow, expandShadow } from '../redux/globalShadowSlice';
import { COLORS } from '../constants/theme'

const globalShadowHeight = Dimensions.get('window').height
const globalShadowWidth = Dimensions.get('window').width

const GlobalShadow = () => {
  const dispatch = useDispatch()
  const isShadowExpanded = useSelector(state => state.globalShadow.isOpen)

  const closeGlobalShadow = () => {
    dispatch(collapseShadow())
  }
  return (
    <>
      {
        isShadowExpanded ?
        <TouchableOpacity 
          activeOpacity={1}
          onPress={closeGlobalShadow}
          style={{width: 100, height: 100, zIndex: 4, position: 'absolute', backgroundColor: COLORS.black, transform: [{translateX: 333 - 100}, {translateY: 89}]}}
        />
        : null
      }
    </>
  )
}

export default GlobalShadow

const styles = StyleSheet.create({})