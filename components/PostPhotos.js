import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PostPhotos = ({data}) => {
  let postPhotos = []
  if (data.attachments !== undefined) {
    const attachments = data.attachments
    for (let i = 0; i < attachments.length; i++) {
      if (attachments[i].type === 'photo') {
        postPhotos.push(attachments[i].photo)
      } 
    }
  }
  const [photos, setPhotos] = useState(postPhotos)
  const renderPhotos = photos.map(photo => (
    <Image source={{uri: photo.sizes[0].url}} key={photo.access_key} style={{width: photo.sizes[0].width, height: photo.sizes[0].height}}/>
  ))
  return (
    <View>
        {
          renderPhotos && renderPhotos
        }
    </View>
  )
}

export default PostPhotos

const styles = StyleSheet.create({})