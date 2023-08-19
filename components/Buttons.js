import React, { useRef, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TouchableHighlight, Animated, } from 'react-native'
import { SIZES, COLORS } from '../constants/theme'
import Entypo from 'react-native-vector-icons/Entypo'
import { FlatList } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'

export const CollapsibleButton = ({ buttonListItems, isLightTheme, buttonWidth,}) => {
  const scaleShadow = useRef(new Animated.Value(0)).current
  const collapsibleMenuWidthAnimation = useRef(new Animated.Value(0)).current
  const collapsibleMenuHeightAnimation = useRef(new Animated.Value(0)).current
  const zIndexMenu = useRef(new Animated.Value(4)).current
  const [selectedListItem, setSelectedListItem] = useState(buttonListItems[0].text)
  const listItemHeight = 35
  
  const shadow = scaleShadow.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2000]    
  })
  const menuWidth = collapsibleMenuWidthAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200]    
  })
  const menuHeight = collapsibleMenuHeightAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, listItemHeight * 9]    
  })

  const renderItem = ({item}) => {
    const onPress = () => {
      setSelectedListItem(item.text); 
      setTimeout(closeCollapsibleMenu, 60);
    }
    return (
      <TouchableOpacity
        style={{
          width: '100%',
          height: listItemHeight,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingLeft: 10,
          // backgroundColor: COLORS.light_blue
        }}
        activeOpacity={0.5}
        onPress={onPress}
      >
        <Text
          style={{
            fontSize: 16
          }}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
    )
  }

  const closeCollapsibleMenu = () => {
    Animated.sequence([
      Animated.timing(collapsibleMenuHeightAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.timing(scaleShadow, {
          toValue: 0,
          duration: 10,
          useNativeDriver: false,
        }),
        Animated.timing(collapsibleMenuWidthAnimation, {
          toValue: 0,
          duration: 10,
          useNativeDriver: false,
        }),
      ]),
      Animated.timing(zIndexMenu, {
        toValue: 4,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start()
  }

  const openCollapsibleMenu = () => {
    Animated.sequence([
      Animated.timing(zIndexMenu, {
        toValue: 6,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.timing(scaleShadow, {
          toValue: 1,
          duration: 10,
          useNativeDriver: false,
        }),
        Animated.timing(collapsibleMenuWidthAnimation, {
          toValue: 1,
          duration: 10,
          useNativeDriver: false,
        })
      ]),
      Animated.timing(collapsibleMenuHeightAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      })
    ]).start()
  }

  return (
    <TouchableOpacity style={[styles.collapsibleButtonContainer, {width: buttonWidth}]} onPress={openCollapsibleMenu} activeOpacity={1}>
      <Text
        style={[styles.radioButtonText, {color: COLORS.secondary}]}
      >
        {selectedListItem}
      </Text>
      <Animated.View
        style={[{width: shadow, height: shadow, position: 'absolute', zIndex: 3}]}
      >
        <TouchableOpacity 
          style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 3}} 
          onPress={closeCollapsibleMenu}
          activeOpacity={0}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.collapsibleButtonMenu,
          {
            width: '100%', 
            height: menuHeight,
            backgroundColor: COLORS.white,
            flex: 1,
            // zIndex: zIndexMenu
          }
        ]}
      >
        <FlatList 
          data={buttonListItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </Animated.View>
      
      <Entypo name='chevron-down' color={COLORS.secondary} size={22}/>
    </TouchableOpacity>
  )
}

export const CollapsibleOption = ({headerText, buttons, isLightTheme}) => {
  const buttonWidth =  buttons.length === 1 ? '100%' : `${Math.floor(100 / buttons.length) - 3}%` 
  return (
    <View style={{marginTop: 5, marginBottom: 5}}>
      <Text style={{fontSize: 16, color: COLORS.secondary}}>{headerText}</Text>
      <View
        style={[styles.radioButtonsContainer]}
      >
        {
          buttons.map(item => (
            <CollapsibleButton 
              key={item.id} 
              buttonListItems={item.buttonListItems}
              buttonWidth={buttonWidth}
            />
          ))
        }
      </View>
    </View>
  )
}

export const RadioButton = ({id, text, changeColor, chosenElementId, data}) => {
  const onPress = () => {
    changeColor(id)
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress} 
      style={[styles.radioButtonContainer, id === chosenElementId ? {backgroundColor: COLORS.primary} : {backgroundColor: COLORS.light_smoke}]}
    >
      <Text 
        style={[styles.radioButtonText, id === chosenElementId ? {color: COLORS.white} : {color: COLORS.secondary}]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export const RadioOption = ({headerText, buttonsData, changeColor, chosenElementId}) => {
  return (
    <View style={{marginTop: 5, marginBottom: 5}}>
      <Text style={{fontSize: 16, color: COLORS.secondary}}>{headerText}</Text>
      <View
        style={[styles.radioButtonsContainer]}
      >
        {buttonsData.map(item => (
        <RadioButton 
          key={item.id} 
          id={item.id} 
          text={item.text}
          changeColor={changeColor} 
          chosenElementId={chosenElementId}
        />
      ))}
      </View>
    </View>
  )
}

export const CommentMenuButton = ({icon, buttonText, pressHandler, isLightTheme, type}) => {
  const commentsData = useSelector(state => state.comments)
  const userId = commentsData.authorId
  const commentText = commentsData.commentText
  const onPress = () => {
    if (type === 'profile') {
      pressHandler(userId)
    } else if (type === 'liked') {
      pressHandler()
    } else if (type === 'copy') {
      pressHandler(commentText)
    }
  }
  return (
    <TouchableOpacity style={styles.commentMenuButton} onPress={onPress}>
      <>
        {icon}
        <Text style={[styles.commentMenuButtonText, isLightTheme ? {color: COLORS.primary} : {color: COLORS.white}]}>{buttonText}</Text>
      </>
    </TouchableOpacity>
  )
}

export const CustomDrawerButton = ({ buttonIcon, buttonText, pressHandler }) => {
  return (
    <TouchableOpacity style={styles.drawerButtonContainer} onPress={pressHandler}>
      <View>{buttonIcon}</View>
      <Text style={styles.drawerButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export const LoginButton = ({buttonText, navigation, isLightTheme }) => {  
  return (
    <TouchableHighlight 
      style={[styles.loginButtonContainer, isLightTheme ? {backgroundColor: COLORS.primary} : {backgroundColor: COLORS.primary_dark}]} 
      underlayColor={COLORS.primary_light}
      activeOpacity={0.6}
      onPress={() => navigation.navigate('WebViewLogin')}
    > 
      <LinearGradient 
        style={{width: '100%', height: '100%', borderRadius: 5, alignContent: 'center', justifyContent: 'center'}}
        colors={isLightTheme ? [COLORS.gradientHeaderStart, COLORS.gradientHeaderEnd] : [COLORS.background_dark, COLORS.black]}
      >
        <Text style={isLightTheme ? styles.textLight : styles.textDark}>
          {buttonText}
        </Text>
      </LinearGradient>
    </TouchableHighlight>
  )
}

export const OptionsButton = ({buttonIcon, buttonText, isLightTheme, buttonPressHandler}) => {
  return (
    <TouchableOpacity style={isLightTheme ? styles.optionsButtonContainerLight : styles.optionsButtonContainerDark} onPress={buttonPressHandler}>
      <View style={styles.nameAndButtonIconContainer}>
        {buttonIcon}
        <Text style={isLightTheme ? styles.buttonTextStyleLight : styles.buttonTextStyleDark}>{buttonText}</Text>
      </View>
      <Entypo name='chevron-right' color={COLORS.secondary} size={22} style={styles.optionsIcon}/>
    </TouchableOpacity>
  )
}

export const WallHeaderButton = ({ isActiveState, activeStateText, inactiveStateText, switchToActiveStateHandler, switchToInactiveStateHandler, shouldAlwaysBeActive }) => {
  const [isActive, setIsActive] = useState(isActiveState)
  const onPress = () => {
    if (isActiveState) {
      switchToInactiveStateHandler()
    } else {
      switchToActiveStateHandler()
    }
    if (!shouldAlwaysBeActive) {
      setIsActive(prevState => !prevState)
    }
  }
  return (
    <TouchableOpacity 
      style={{
        // backgroundColor: isActive ? COLORS.primary : COLORS.secondary,
        height: 40,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
      }}
      onPress={onPress}
    >
      <LinearGradient 
        style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 5}} 
        colors={isActive ? [COLORS.gradientHeaderStart, COLORS.gradientHeaderEnd] : [COLORS.smoke, COLORS.secondary]}>
        <Text style={styles.wallHeaderButtonTextStyle}>{isActive ? activeStateText : inactiveStateText}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  collapsibleButtonMenu: {
    position: 'absolute', 
    // zIndex: 4,
    borderRadius: 5,
    elevation: 30,
    shadowColor: COLORS.black,
  },
  collapsibleButtonContainer: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.light_smoke,
    position: 'relative',
    zIndex: 2
  },
  radioButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  radioButtonContainer: {
    width: 100,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  radioButtonText: {
    fontSize: 17
  },
  loginButtonContainer: {
    width: 170,
    height: 45,
    borderRadius: 5,
    padding: 5,
    alignContent: 'center',
    justifyContent: 'center',
  },
  commentMenuButton: {
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    // paddingLeft: 15,
    borderRadius: 5,
  },
  commentMenuButtonText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  textLight: {
    fontFamily: 'sans-serif',
    fontSize: SIZES.small + 2,
    color: COLORS.white,
    textAlign: 'center'
  },
  textDark: {
    fontFamily: 'sans-serif',
    fontSize: SIZES.small + 2,
    color: COLORS.primary_text,
    textAlign: 'center'
  },
  optionsIcon: {
    marginLeft: 5,
    marginRight: 10
  },
  buttonTextStyleLight: {
    fontSize: 17,
    color: COLORS.black
  },
  buttonTextStyleDark: {
    fontSize: 17,
    color: COLORS.primary_text
  },
  nameAndButtonIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',    
  },
  optionsButtonContainerLight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 5,
  },
  optionsButtonContainerDark: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: COLORS.primary_dark,
    borderRadius: 5,
  },

  wallHeaderButtonActiveState: {
    backgroundColor: COLORS.primary,
    height: 45,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  wallHeaderButtonInactiveState: {
    backgroundColor: COLORS.secondary,
    height: 45,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },

  wallHeaderButtonTextStyle: {
    color: COLORS.white,
    fontSize: 17,
    textAlign: 'center'
  },

  drawerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 19,
    height: 50
    // backgroundColor: COLORS.light_smoke,
  },
  drawerButtonText: {
    color: COLORS.white,
    fontSize: 15,
    marginLeft: 25,
  }
});