import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../constants/theme';

const screenWidth = Dimensions.get('window').width
const OpenedPhotoBottom = () => {
  const [liked, setLike] = React.useState(false)
  // console.log('render')
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: screenWidth, paddingLeft: 15, paddingRight: 15, paddingBottom: 10}}>
      <TouchableOpacity onPress={() => setLike(prev => !prev)}>
        {
          liked ?
          <AntDesign name={'heart'} color={COLORS.primary} size={20}/> :
          <AntDesign name={'hearto'} color={COLORS.white} size={20}/>
        }
      </TouchableOpacity>
      <TouchableOpacity><MaterialCommunityIcons name={'comment-outline'} color={COLORS.white} size={20} /></TouchableOpacity>
      <TouchableOpacity><MaterialCommunityIcons name={'share-outline'} size={22} color={COLORS.white}/></TouchableOpacity>
    </View>
  )
}

export default OpenedPhotoBottom

const styles = StyleSheet.create({})