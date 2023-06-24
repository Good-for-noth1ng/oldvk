import { StyleSheet, Text, View, TouchableOpacity, TextInput, BackHandler } from 'react-native'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NewsTitleSwitcher from './NewsTitleSwitcher'
import { COLORS } from '../constants/theme'

const CustomHeader = ({headerName, iconTouchHandler, iconComponent, showSearchIcon, handleInputChange, navigation, isLightTheme, gapForSearchIcon, rightsideIconComponent, rightsideIconComponentTouchHandler, onCleaningInput, onOptionsButton, isScreenFromDrawerMenu}) => {
  const [showSearchInputField, setShowSearchInputField] = useState(false)
  const inputField = useRef()
  const [inputFieldText, setInputFieldText] = useState('')

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // console.log(inputField.current)
        if (inputField.current !== null && inputField.current !== undefined) {
          if ((inputField.current.isFocused() || showSearchInputField) && inputFieldText !== '') {
            inputField.current.clear()
            setInputFieldText('')
            return true
          } else if ((inputField.current.isFocused() || showSearchInputField) && inputFieldText === '') {
            inputField.current.blur()
            onCleaningInput()
            setShowSearchInputField(false)
            return true
          }
        } else {
          if (isScreenFromDrawerMenu) {
            navigation.getParent().openDrawer()
            return true
          } else {
            return false
          }

        }
      }
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () => subscription.remove()
      
    }, [inputField.current, inputFieldText])
  )

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
    if (onCleaningInput !== undefined) {
      onCleaningInput()
    }
  }

  const handlingChanges = (text) => {
    setInputFieldText(text)
    handleInputChange(text)
  }

  const openOptions = () => {
    inputField.current.blur()
    onOptionsButton()
  }

  return (
    <View style={[styles.headerContainer, isLightTheme ? {backgroundColor: COLORS.primary} : {backgroundColor: COLORS.primary_dark}]}>
      {
        showSearchInputField ?
        <View style={styles.inputFieldContainer}>
          <View style={[styles.inputFieldInnerContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.background_dark}]}> 
            <TouchableOpacity style={styles.inputButtonsContainer} onPress={blurInput}>
              <AntDesign name='arrowleft' size={20} color={COLORS.secondary}/>
            </TouchableOpacity>  
            <TextInput
              style={[styles.inputField, isLightTheme ? {color: COLORS.black} : {color: COLORS.primary_text}]} 
              ref={inputField}
              onLayout={initFocusOnField}
              selectionColor={COLORS.secondary}
              placeholder='Search'
              placeholderTextColor={COLORS.smoke}
              onChangeText={handlingChanges}
              autoCapitalize='none'
              value={inputFieldText}
            />
            <View style={{width: 70, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
              <TouchableOpacity onPress={clearInputField}>
                <AntDesign name='close' size={20} color={COLORS.secondary}/>
              </TouchableOpacity>
              {
                onOptionsButton && (
                  <TouchableOpacity onPress={openOptions}>
                    <Ionicons name='options-outline' size={20} color={COLORS.secondary}/>
                  </TouchableOpacity>
                )
              }
            </View>
          </View>
        </View> :
        <>
          <TouchableOpacity activeOpacity={1} style={styles.iconContainer} onPress={iconTouchHandler}>
            {iconComponent}
          </TouchableOpacity>
          <View>
            {headerName}
          </View>
          {
            rightsideIconComponent &&
            <TouchableOpacity style={styles.rightsideIcon} activeOpacity={1} onPress={rightsideIconComponentTouchHandler}>
              {rightsideIconComponent}
            </TouchableOpacity>
          }
        </>
      }
      
      {
        showSearchIcon && !showSearchInputField ? 
        <TouchableOpacity style={{marginLeft: gapForSearchIcon}} onPress={handleSearchIconPress}>
          <FontAwesome name='search' size={20} color={COLORS.white}/>
        </TouchableOpacity>
         : null
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
  },
  inputFieldContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  inputFieldInnerContainer: {
    width: '85%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
  },
  inputField: {
    width: '65%',
    height: '100%',
    fontSize: 17,
  },
  inputButtonsContainer: { 
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
  },
  rightsideIcon: {
    marginLeft: '48%'
  }
})