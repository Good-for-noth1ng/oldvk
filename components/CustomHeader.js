import { StyleSheet, Text, View, TouchableOpacity, TextInput, BackHandler } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NewsTitleSwitcher from './NewsTitleSwitcher'
import { COLORS } from '../constants/theme'

const CustomHeader = ({headerName, iconTouchHandler, iconComponent, showSearchIcon, handleInputChange, navigation, isLightTheme, gapForSearchIcon, rightsideIconComponent, rightsideIconComponentTouchHandler}) => {
  const [showSearchInputField, setShowSearchInputField] = useState(false)
  const inputField = useRef()

  // BackHandler.addEventListener('hardwareBackPress',  () => {
  //   console.log(showSearchInputField)
  //   if (showSearchInputField) {
  //     setShowSearchInputField(false)
  //     return true
  //   }
  //   return false
  // })

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

  const handlingChanges = (text) => {
    handleInputChange(text)
  }
  return (
    <View style={isLightTheme ? styles.headerContainerLight : styles.headerContainerDark}>
      {
        showSearchInputField ?
        <View style={styles.inputFieldContainer}>
          <View style={isLightTheme ? styles.inputFieldInnerContainerLight : styles.inputFieldInnerContainerDark}> 
            <TouchableOpacity style={styles.inputButtonsContainer} onPress={blurInput}>
              <AntDesign name='arrowleft' size={20} color={COLORS.secondary}/>
            </TouchableOpacity>  
            <TextInput
              style={isLightTheme ? styles.inputFieldLight : styles.inputFieldDark} 
              ref={inputField}
              onLayout={initFocusOnField}
              selectionColor={COLORS.secondary}
              placeholder='Search'
              placeholderTextColor={COLORS.smoke}
              onChangeText={handlingChanges}
              autoCapitalize='none'
              onBlur={blurInput}
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
  headerContainerLight: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  headerContainerDark: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.primary_dark,
  },
  inputFieldContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  inputFieldInnerContainerLight: {
    width: '90%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  inputFieldInnerContainerDark: {
    width: '90%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.background_dark,
  },
  inputFieldLight: {
    width: '75%',
    height: '100%',
    fontSize: 17,
    color: COLORS.black
  },
  inputFieldDark: {
    width: '75%',
    height: '100%',
    fontSize: 17,
    color: COLORS.primary_text
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
  },
  rightsideIcon: {
    marginLeft: '48%'
  }
})