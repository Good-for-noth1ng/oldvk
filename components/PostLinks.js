import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { COLORS } from '../constants/theme'

const PostLinks = ({postLinks, isLightTheme}) => {
  if (postLinks.length > 0) {
    const postLink = postLinks[0]
    const url = postLink.url
    let title = postLink.title
    title = title.slice(0, 35)
    if (title !== postLink.title) {
      title += '...' 
    }
    let address = url
    address = address.slice(0, 35)
    if (address !== url) {
      address += '...' 
    }
    return (  
      <TouchableOpacity style={styles.linkContainer} activeOpacity={0.7} onPress={() => Linking.openURL(url)}>
       <View style={styles.linkIconContainer}>
         <Feather name='arrow-up-right' size={30} color={COLORS.secondary} />
       </View>
       <View style={styles.linkInfoContainer}>
         <Text style={isLightTheme ? styles.nameLight : styles.nameDark}>{title}</Text>
          <Text style={isLightTheme ? styles.addressLight : styles.addressDark}>{address}</Text>
       </View>
     </TouchableOpacity>
  )} else {
    return null
  }
}

export default PostLinks

const styles = StyleSheet.create({
  linkContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 5,
    marginBottom: 5
  },
  linkIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light_smoke,
    borderRadius: 40
  },
  linkInfoContainer: {
    display: 'flex',
    width: '85%',
    flexDirection: 'column',
    marginLeft: 10,
  },
  nameLight: {
    fontSize: 14,
    color: COLORS.black,
  },
  nameDark: {
    fontSize: 14,
    color: COLORS.primary_text,
  },
  addressLight: {
    fontSize: 13,
    color: COLORS.black,
  },
  addressDark: {
    fontSize: 13,
    color: COLORS.primary_text
  }
})