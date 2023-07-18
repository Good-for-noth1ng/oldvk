import { StyleSheet, Text, View, Animated, TouchableOpacity, Easing } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import {Dropdown} from 'react-native-element-dropdown'
import { COLORS } from '../constants/theme';
import { setCurrentPage } from '../redux/newsSlice';
import { useSelector, useDispatch } from 'react-redux';

const NewsTitleSwitcher = () => {
  const dispatch = useDispatch()
  const currentPage = useSelector(state => state.news.currentPage)
  const anim = React.useRef(new Animated.Value(0)).current
  const isPressed = React.useRef(false)
  const rotation = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })
  const listHeight = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100]
  })
  // const newsOptions = [
  //   {label: 'News', value: 'News'},
  //   {label: 'Recommended', value: 'Recommended'}
  // ]      
  const onNewsTypePress = () => {
    if (isPressed.current) {
      Animated.timing(anim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.linear
      }).start()
    }
    isPressed.current = !isPressed.current
  }

  const onNewsOptionPress = () => {

    Animated.timing(anim, {
      toValue: 0,
      duration: 1,
      useNativeDriver: false,
    }).start()
    dispatch(setCurrentPage('News'))
  }

  const onRecommendedOptionPress = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 1,
      useNativeDriver: false,
    }).start()
    dispatch(setCurrentPage('Recommended'))
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.title} onPress={onNewsTypePress}>
        <Text style={styles.selectedTextStyle}>{currentPage}</Text>
        <Animated.View style={{transform: [{rotate: rotation}],}}>
          <Entypo name='chevron-down' color={COLORS.white} size={20}/>
        </Animated.View>
      </TouchableOpacity>
      <Animated.View 
        style={[styles.dropdown, {height: listHeight}]}
      >
        <TouchableOpacity 
          style={[styles.optionContainer, currentPage === 'News' && {backgroundColor: COLORS.white}]} 
          onPress={onNewsOptionPress}
        >
          <Text style={styles.option}>News</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.optionContainer, currentPage === 'Recommended' && {backgroundColor: COLORS.white}]} 
          onPress={onRecommendedOptionPress}
        >
          <Text style={styles.option}>Recommended</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default NewsTitleSwitcher

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start', 
    justifyContent: 'flex-start', 
    position: 'absolute',  
    top: -20,
    zIndex: 5,
    elevation: 9
  },
  dropdown: {
    backgroundColor: COLORS.light_smoke, 
    zIndex: 3,
    elevation: 4,
    position: 'relative',
    width: 150,
    borderRadius: 5,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: 140,
    height: 40,
  },
  optionContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    backgroundColor: COLORS.light_smoke,
    paddingLeft: 10,
    borderRadius: 5,
  },
  option: {
    fontSize: 18,
    color: COLORS.black,
  },
  selectedTextStyle: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
})