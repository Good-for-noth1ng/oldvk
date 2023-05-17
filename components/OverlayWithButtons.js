import { StyleSheet, Text, View, Animated, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
import { CommentMenuButton } from './Buttons'
import { getTimeDate } from '../utils/date'

const OverlayWithButtons = ({slideAnimation, isLightTheme, headerComponent, buttons, handleShadowTouch, registrationDate, registrationDateIsFetching, authorImgUrl, authorName}) => {
  
  const onShadowPress = () => {
    handleShadowTouch()
  }

  return (
    <Animated.View style={[styles.box, {transform: [{translateY: slideAnimation}]}]}>
      <TouchableOpacity style={styles.upperShadow} onPress={onShadowPress} activeOpacity={0}>
      </TouchableOpacity>
      <View style={[styles.menuContainer]}>
        <TouchableOpacity style={styles.sideShadow} onPress={onShadowPress} activeOpacity={0}>
        </TouchableOpacity>
        <View style={[styles.menu, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.very_dark_gray}]}>
          <View style={styles.nameAvatarContainer}>
            <Image style={styles.avatarInfo} source={{uri: authorImgUrl}}/>
            <Text style={[styles.nameInfo, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}>{authorName}</Text>
          </View>
          <View style={styles.registredContainer}>
            <Text style={styles.registredText}>Registred: {getTimeDate(registrationDate)}</Text>
          </View>
          {
            buttons.map(item => (
              <CommentMenuButton icon={item.icon} buttonText={item.text} key={item.key} isLightTheme={isLightTheme}/>
            ))
          }
        </View>
        <TouchableOpacity style={styles.sideShadow} onPress={onShadowPress} activeOpacity={0}>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.downShadow} onPress={onShadowPress} activeOpacity={0}>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default OverlayWithButtons

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    position: 'absolute',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '60%' //60%
  },
  upperShadow: {
    backgroundColor: COLORS.black,
    opacity: 0,
    width: '100%',
    height: '20%',
  },
  menu: {
    width: '94%',
    height: '100%',
    elevation: 30,
    shadowColor: COLORS.black,
    borderRadius: 5,
    padding: 15
  },
  sideShadow: {
    height: '100%',
    width: '3%',
    backgroundColor: COLORS.black,
    opacity: 0,
  },
  downShadow: {
    backgroundColor: COLORS.black,
    opacity: 0,
    width: '100%',
    height: '40%',
  },
  nameAvatarContainer: {
    width: '100%',
    display: 'flex',
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInfo: {
    width: 50, 
    height: 50, 
    borderRadius: 100, 
    marginRight: 5,
  },
  nameInfo: {
    fontSize: 16, 
    fontWeight: '700',  
    marginLeft: 5,
  },
  registredContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  registredText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondary
  },
})