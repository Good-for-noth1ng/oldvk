import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NewsTitleSwitcher from './NewsTitleSwitcher'
import { COLORS } from '../constants/theme'

const CustomHeader = ({headerName, iconTouchHandler, iconComponent, showSearchIcon}) => {
  const [showSearchInputField, setShowSearchInputField] = useState(false)
  const inputField = useRef()
  const handleSearchIconPress = () => {
    setShowSearchInputField(true)
  }
  const initFocusOnField = () => {
    if (inputField.current) {
      inputField.current.focus()
    }
  }
  const blurInput = () => {
    setShowSearchInputField(false)
  }

  const clearInputField = () => {
    inputField.current.clear()
  }
  return (
    <View style={styles.headerContainer}>
      {
        showSearchInputField ?
        <View style={styles.inputFieldContainer}>
          <View style={styles.inputFieldInnerContainer}> 
            <TouchableOpacity style={styles.inputButtonsContainer} onPress={blurInput}>
              <AntDesign name='arrowleft' size={20} color={COLORS.secondary}/>
            </TouchableOpacity>  
            <TextInput 
              style={styles.inputField} 
              ref={inputField}
              onLayout={initFocusOnField}
              selectionColor={COLORS.secondary}
              placeholder='Search'
              placeholderTextColor={COLORS.smoke}
            />
            <TouchableOpacity style={styles.inputButtonsContainer} onPress={clearInputField}>
              <AntDesign name='close' size={20} color={COLORS.secondary}/>
            </TouchableOpacity>
          </View>
        </View> :
        <>
          <TouchableOpacity activeOpacity={1} style={styles.iconContainer} onPress={iconTouchHandler}>
            {iconComponent}
          </TouchableOpacity>
          <View>
            {headerName}
          </View>
        </>
      }
      
      {
        showSearchIcon && !showSearchInputField ? 
        <TouchableOpacity style={styles.searchIcon} onPress={handleSearchIconPress}>
          <FontAwesome name='search' size={20} color={COLORS.white}/>
        </TouchableOpacity> : null
      }
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },

  inputFieldContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  inputFieldInnerContainer: {
    width: '90%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  inputField: {
    width: '75%',
    height: '100%',
    fontSize: 17,
    backgroundColor: COLORS.white,
    color: COLORS.black
  },
  inputButtonsContainer: {
    // backgroundColor: COLORS.light_smoke, 
    width: '12%', 
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },  
  iconContainer: {
    marginLeft: 15,
    marginRight: 35,
  },
  searchIcon: {
    marginLeft: '35%'
  }
})