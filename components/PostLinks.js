import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { COLORS } from '../constants/theme'
import { postWidth } from '../constants/theme'

const PostLinks = ({postLinks, isLightTheme}) => {
  // console.log(postLinks[0])
  // return (
  //   <View style={{justifyContent: 'center', alignItems: 'center'}}>
  //     {
  //       postLinks.map(postLink => {
  //         if (postLink.photo !== undefined) {
  //           let url
  //           for (let i = 0; i < postLink.photo.sizes.length; i++) {
  //             if (postLink.photo.sizes[i].type === 'z') {
  //               url = postLink.photo.sizes[i].url
  //               break
  //             }
  //           }
  //           if (url === undefined) {
  //             url = postLink.photo.sizes[postLink.photo.sizes.length - 1].url
  //           }
  //           return (
  //             <TouchableOpacity activeOpacity={0.8}>
  //               <Image source={{uri: url}} style={{width: postWidth, height: postWidth * 0.7, borderRadius: 5}}/>
  //               <Text style={{position: 'absolute', fontSize: 16, fontWeight: 'bold', color: COLORS.white, top: '50%', left: '25%'}}>
  //                 {postLink.title}
  //               </Text>
  //             </TouchableOpacity>
  //           )
  //         } else {
  //             const url = postLink.url
  //             let title = postLink.title
  //             title = title.slice(0, 35)
  //             if (title !== postLink.title) {
  //               title += '...' 
  //             }
  //             let address = url
  //             address = address.slice(0, 35)
  //             if (address !== url) {
  //               address += '...' 
  //           }
  //           return (
  //             <TouchableOpacity style={styles.linkContainer} activeOpacity={0.7} onPress={() => Linking.openURL(url)}>
  //               <View style={styles.linkIconContainer}>
  //                 <Feather name='arrow-up-right' size={30} color={COLORS.secondary} />
  //               </View>
  //               <View style={styles.linkInfoContainer}>
  //                 <Text style={isLightTheme ? styles.nameLight : styles.nameDark}>{title}</Text>
  //                  <Text style={isLightTheme ? styles.addressLight : styles.addressDark}>{address}</Text>
  //               </View>
  //             </TouchableOpacity>     
  //           )
  //         }
  //       })
  //     }
  //   </View>
  // )





  
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