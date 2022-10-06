import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PostPhotos = ({postPhotos}) => {
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