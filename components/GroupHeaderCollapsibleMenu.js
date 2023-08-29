import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import GlobalShadow from './GlobalShadow'
import { collapseShadow, expandShadow } from '../redux/globalShadowSlice'
import { COLORS } from '../constants/theme'

const GroupHeaderCollapsibleMenu = ({ accessToken, isLightTheme}) => {
  // const [isShadowExpanded, setIsShadowExpanded] = React.useState(false)
  const dispatch = useDispatch()
  const isShadowExpanded = useSelector(state => state.globalShadow.isOpen)
  const anim = React.useRef(new Animated.Value(0)).current
  const shouldPerformAnimation = React.useRef(false)
  const listHeight = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200]
  })

  // const shadow = anim.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, 5000]
  // })

  React.useEffect(() => {
    if (shouldPerformAnimation.current) {
      if (isShadowExpanded) {
        Animated.timing(anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start()
      } else {
        Animated.timing(anim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start()
      }
    } else {
      shouldPerformAnimation.current = true
    }
  }, [isShadowExpanded])

  const openDropdownMenu = () => {
    dispatch(expandShadow({dropdownX: 5000, dropdownY: 5000}))
    // setIsShadowExpanded(true)
  }

  const closeDropdownMenu = () => {

    // setIsShadowExpanded(false)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={openDropdownMenu}>
        <Feather name='more-vertical' size={20} color={COLORS.white}/>
      </TouchableOpacity>
      <GlobalShadow />
      <Animated.View style={[
        styles.dropdown,
        {height: listHeight}, 
        isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor : COLORS.secondary}
      ]}>
        <TouchableOpacity 
          style={[
            styles.optionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]} 
        >
          <Text style={[styles.option, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Add to Bookmarks</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.optionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]} 
        >
          <Text style={[styles.option, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Leave/Join Community</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.optionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]} 
        >
          <Text style={[styles.option, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Copy link</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.optionContainer,  
            isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.smoke}
          ]} 
        >
          <Text style={[styles.option, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>Report</Text>
        </TouchableOpacity>
      </Animated.View>
      {/* <Animated.View style={{width: shadow, height: shadow, position: 'absolute', right: '-100%', backgroundColor: COLORS.black}}>
        <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={closeDropdownMenu} activeOpacity={1}/>
      </Animated.View> */}
    </View>
  )
}

export default GroupHeaderCollapsibleMenu

const styles = StyleSheet.create({
  container: {
    zIndex: 4,
    position: 'absolute',
    top: -10,
    right: 0
  },
  dropdown: { 
    zIndex: 5,
    position: 'absolute',
    elevation: 15,
    width: 200,
    borderRadius: 5,
    right: 0
  },
  optionContainer: {
    width: '100%',
    // height: '50%',
    flex: 1,
    zIndex: 5,
    justifyContent: 'center',
    backgroundColor: COLORS.light_smoke,
    paddingLeft: 10,
    borderRadius: 5
  },
  option: {
    fontSize: 18,
  },
})