import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import { COLORS } from '../constants/theme'
import { getDuration } from '../utils/numShortage';

const CommentAttachments = ({attachments, navigation, isLightTheme}) => {
    // console.log(attachments)
  return (
    <View style={styles.container}>
      {
        attachments.map(attachment => {
          if (attachment.type === 'photo') {
            return (
              <Image 
                source={{uri: attachment.photo.sizes[attachment.photo.sizes.length - 1].url}} 
                style={styles.photo}
                key={attachment.photo.id}
              />
            )
          } else if (attachment.type === 'video') {
            return (
              <TouchableOpacity 
                style={styles.photo} 
                key={attachment.video.id}
                activeOpacity={1}
                onPress={
                  () => 
                  {
                    navigation.push(
                    'Video', 
                    {
                      ownerId: attachment.video.owner_id, 
                      videoId: attachment.video.id, 
                      accessKey: attachment.video.access_key
                    }
                  )}
                }
              >
                <Image 
                  source={{uri: attachment.video.image[attachment.video.image.length - 1].url}} 
                  style={styles.videoCover}
                />
                <View style={styles.videoTriangleContainer}>
                  <View style={styles.videoTriangle}>
                    <Entypo name='triangle-right' color={COLORS.white} size={30}/>
                  </View>
                </View>
                <Text style={styles.timeDuration}>{getDuration(attachment.video.duration)}</Text>
              </TouchableOpacity>
            )
          } else if (attachment.type === 'doc') {
            if (attachment.doc.ext === 'gif') {
              return (
                <View
                  style={styles.photo}
                >
                  <Image 
                    source={{uri: attachment.doc.preview.photo.sizes[attachment.doc.preview.photo.sizes.length - 1].src}}
                    style={styles.videoCover}
                  />
                  <Text style={styles.timeDuration}>gif</Text>
                </View>
              )
            } else {
              return null
            }
          } else if (attachment.type === 'link') {
            return (
              <TouchableOpacity 
                style={styles.linkContainer}
                activeOpacity={0.8}
                onPress={() => Linking.openURL(attachment.link.url)}
              >
                <View style={styles.linkIconContainer}>
                  <Feather name='arrow-up-right' size={30} color={COLORS.secondary} />
                </View>
                <View style={styles.linkInfoContainer}>
                  <Text 
                    style={[styles.linkName, isLightTheme ? {color: COLORS.black} : {color: COLORS.white}]}
                  >
                    {attachment.link.title}
                  </Text>
                  <Text style={styles.linkAddress}>
                    {attachment.link.caption}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          } else {
            return null
          }
        })
      }
    </View>
  )
}

export default CommentAttachments

const styles = StyleSheet.create({
  container: {
    width: '85%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: COLORS.light_smoke
  },
  photo: {
    width: '49%',
    height: '100%',
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  timeDuration: {
    position: 'absolute', 
    zIndex: 3, 
    color: COLORS.white, 
    backgroundColor: COLORS.light_black, 
    opacity: 0.8,
    fontSize: 15,
    borderBottomRightRadius: 5
  },
  videoTriangleContainer: {
    position: 'absolute', 
    zIndex: 2, 
    width: '100%', 
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  videoTriangle: {
    backgroundColor: COLORS.light_black, 
    opacity: 0.9, 
    borderRadius: 5
  },
  videoCover: {
    width: '100%', 
    height: '100%', 
    borderRadius: 5,
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
  linkName: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  linkAddress: {
    fontSize: 13,
    color: COLORS.secondary
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
  linkContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    // marginTop: 5,
    // marginBottom: 5
  },
})