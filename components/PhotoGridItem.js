import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'
const PhotoGridItem = ({item, isLightTheme, id}) => {
  return (
    <View style={[styles.container, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark} ]}>
      <Image 
        style={{width: '100%', height: '100%'}}
        source={{uri: item.sizes[item.sizes.length - 1].url}}
      />
    </View>
  )
}

// export default PhotoGridItem
export default React.memo(PhotoGridItem, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id;
})

const styles = StyleSheet.create({
  container: {
    width: '33.33%', //33.33% 116.5px
    height: 140,  
    padding: 0,
  }
})