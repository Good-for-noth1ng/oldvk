import { StyleSheet, Text, View, TouchableOpacity, Touchable } from 'react-native'
import React, { useState, useCallback, memo } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DividerWithLine from './DividerWithLine'
import CountSortComments from './CountSortComments'
import { getShortagedNumber } from '../utils/numShortage'
import { COLORS } from '../constants/theme'

const OpenedPostBottom = ({reposts, likes, views, comments, isLightTheme}) => {
  const [isLikePressed, setIsLikePressed] = useState(false);
  const [likesCount, setLikesCount] = useState(likes !== undefined ? likes : 0);
  const [repostsCount, setRepostsCount] = useState(reposts !== undefined ? reposts : 0);
  const handleLikePress = useCallback(() => {
    if (isLikePressed) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLikePressed(!isLikePressed);
  }, [isLikePressed])
  const unactiveButtonColor = !isLightTheme ? COLORS.secondary : COLORS.smoke  
  return (
    <>
      <View style={!isLightTheme ? styles.bottomPostContainerLight : styles.bottomPostContainerDark}>
        <View style={styles.leftButtonsContainer}>
          <TouchableOpacity onPress={handleLikePress} activeOpacity={1} style={styles.leftButtons}>
            <AntDesign name='like1' style={styles.iconsInfoGap} size={20} color={isLikePressed ? COLORS.primary : unactiveButtonColor}/>
            <Text style={{color: COLORS.secondary}}>{getShortagedNumber(likesCount)}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.leftButtons}>
            <FontAwesome name='share' style={styles.iconsInfoGap} size={20} color={unactiveButtonColor}/>
            <Text style={{color: COLORS.secondary}}>{getShortagedNumber(repostsCount)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewsButton}>
          <AntDesign name='eye' style={styles.iconsInfoGap} size={20} color={unactiveButtonColor}/>
          <Text style={{color: COLORS.secondary}}>{getShortagedNumber(views)}</Text>
        </View>
      </View>
      <DividerWithLine  
        dividerHeight={40} 
        dividerColor={!isLightTheme ? COLORS.white : COLORS.primary_dark}
        dividerLineColor={!isLightTheme ? COLORS.light_smoke : COLORS.smoke}
        dividerLineHeight={1}
        dividerLineWidth={'95%'}
        linePosition={'center'}
      />
      <CountSortComments comments={comments} isLightTheme={isLightTheme}/>
      <DividerWithLine 
        dividerHeight={20} 
        dividerColor={!isLightTheme ? COLORS.white : COLORS.primary_dark}
      />
    </>
  )
}

export default memo(OpenedPostBottom)

const styles = StyleSheet.create({
  bottomPostContainerLight: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 7,
    paddingRight: 7,
    height: 20,
    backgroundColor: COLORS.white
  },
  bottomPostContainerDark: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 7,
    paddingRight: 7,
    height: 20,
    backgroundColor: COLORS.primary_dark
  },
  leftButtonsContainer: {
    display: 'flex', 
    flexDirection: 'row',
    width: '33%',
    justifyContent: 'space-between'
  },
  viewsButton: {
    width: '16%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  leftButtons: {
    width: '38%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconsInfoGap: {
    marginRight: 7
  }
})