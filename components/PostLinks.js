import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, ImageBackground } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../constants/theme'
import { postWidth } from '../constants/theme'

const PostLinks = ({postLinks, isLightTheme, isInFav, accessToken}) => {
  // console.log(postLinks[0])
  const [isFavPressed, setIsFavPressed] = React.useState(isInFav)
  const url = `https://api.vk.com/method/fave.addLink?access_token=${accessToken}&v=5.131`
  const toggleFavStatus = async () => {
    if (isFavPressed) {
      
    }
    setIsFavPressed(prev => !prev)
  }

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {
        postLinks.map(postLink => {
          if (postLink.photo !== undefined) {
            let url, postHeight, objectUrl
            objectUrl = postLink.url
            // console.log(postLink.photo.sizes)
            postLink.photo.sizes.sort(function(a, b){return b.width - a.width})
            // for (let i = 0; i < postLink.photo.sizes.length; i++) {
            //   if (postLink.photo.sizes[i].width >= 300) {
            //     url = postLink.photo.sizes[i].url
            //     postHeight = (postLink.photo.sizes[i].height / postLink.photo.sizes[i].width) * postWidth
            //     break
            //   }
            // }
            url = postLink.photo.sizes[0].url
            // if (url === undefined) {
            //   url = postLink.photo.sizes[postLink.photo.sizes.length - 1].url
            // }
            return (
              <TouchableOpacity activeOpacity={0.8} onPress={() => Linking.openURL(objectUrl)} style={[{borderWidth: 1}, isLightTheme ? {borderColor: COLORS.light_smoke} : {borderColor: COLORS.secondary}]}>
                <ImageBackground 
                  source={{uri: url}} 
                  style={{width: postWidth, justifyContent: 'center', alignItems: 'center', aspectRatio: 2.2, }} 
                  resizeMode='contain'
                >
                  {/* <View style={{width: '100%', height: '100%', backgroundColor: COLORS.black, position: 'absolute', opacity: 0.3}}/> */}
                  <TouchableOpacity style={{position: 'absolute', top: 5, right: 10}} activeOpacity={0.8} onPress={() => setIsFavPressed(prev => !prev)}>
                    <AntDesign name={isFavPressed ? 'star' : 'staro'} size={25} color={isFavPressed ? COLORS.primary : COLORS.white}/>
                  </TouchableOpacity>
                </ImageBackground>
                <View style={[{padding: 10}, isLightTheme ? {backgroundColor: COLORS.white,} : {backgroundColor: COLORS.light_black}]}>
                  <Text 
                    style={
                      [{
                        fontSize: 16, 
                        fontWeight: 'bold', 
                      },
                      isLightTheme ? {color: COLORS.black} : {color: COLORS.white}
                    ]
                    }
                  >
                    {postLink.title}
                  </Text>
                  <Text style={[isLightTheme ? {color: COLORS.black} : {color: COLORS.light_smoke}]}>
                    {postLink.caption}
                  </Text>
                </View>       
              </TouchableOpacity>
            )
          } else {
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
            )
          }
        })
      }
    </View>
  )





  
  // if (postLinks.length > 0) {
  //   const postLink = postLinks[0]
  //   const url = postLink.url
  //   let title = postLink.title
  //   title = title.slice(0, 35)
  //   if (title !== postLink.title) {
  //     title += '...' 
  //   }
  //   let address = url
  //   address = address.slice(0, 35)
  //   if (address !== url) {
  //     address += '...' 
  //   }
  //   return (  
  //     <TouchableOpacity style={styles.linkContainer} activeOpacity={0.7} onPress={() => Linking.openURL(url)}>
  //      <View style={styles.linkIconContainer}>
  //        <Feather name='arrow-up-right' size={30} color={COLORS.secondary} />
  //      </View>
  //      <View style={styles.linkInfoContainer}>
  //        <Text style={isLightTheme ? styles.nameLight : styles.nameDark}>{title}</Text>
  //         <Text style={isLightTheme ? styles.addressLight : styles.addressDark}>{address}</Text>
  //      </View>
  //    </TouchableOpacity>
  // )} else {
  //   return null
  // }
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