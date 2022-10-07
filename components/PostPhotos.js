import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useState} from 'react'
import uuid from 'react-native-uuid';
const PostPhotos = ({postPhotos}) => {
  const [photos, setPhotos] = useState(postPhotos)
  const renderPhotos = photos.map(photo => (
    <Image 
      source={{uri: photo?.sizes[2].url}} 
      key={uuid.v4()} 
      // style={{width: photo?.sizes[2].width, height: photo?.sizes[2].height}}
      style={{width: 200, height: 100}}
    />
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