import { StyleSheet, Text, View, TouchableOpacity, Platform, ToastAndroid } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as FileSystem from 'expo-file-system'
import { shareAsync } from 'expo-sharing'
import { COLORS } from '../constants/theme'
import uuid from 'react-native-uuid';

const PostFile = ({ isLightTheme, postDoc, name, size, quantity}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const downloadFromUrl = async () => {
    // console.log('asdas')
    const fileName = name
    ToastAndroid.show('Saving is in progress...', ToastAndroid.SHORT)
    setIsLoading(prev => !prev)
    const result = await FileSystem.downloadAsync(
      postDoc.url,
      FileSystem.documentDirectory + fileName
    ).catch(e => console.log(e))
    console.log(result.headers["content-type"])
    save(result.uri, fileName, result.headers["content-type"])
  }

  const save = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64})
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype === 'application/octet-stream' ? 'application/djvu' : mimetype)
        .then(async uri => {
          await FileSystem.writeAsStringAsync(uri, base64, {encoding: FileSystem.EncodingType.Base64})
        })
        .then(() => {
          setIsLoading(prev => !prev)
        })
        .catch(e => {
          console.log(e)
        })
      } 
    } else {
      shareAsync(uri);
      setIsLoading(prev => !prev)
    }

  }

  return (
    <TouchableOpacity 
      style={[styles.fileContainer, isLoading ? {opacity: 0.5} : {opacity: 1}]} 
      activeOpacity={isLoading ? 0.5 : 0.8} 
      onPress={!isLoading ? downloadFromUrl : () => {}}
    >
     <View style={styles.fileIconContainer}>
       <FontAwesome name='file' size={22} color={COLORS.secondary} />
      </View>
     <View style={styles.fileInfoContainer}>
        <Text style={[styles.name, isLightTheme ? {color: COLORS.black} : {color: COLORS.primary_text}]}>{name}</Text>
        <Text style={[styles.additionalInfo, isLightTheme ? {color: COLORS.black} : {color: COLORS.primary_text}]}>{postDoc.ext} {size} {quantity}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PostFile

const styles = StyleSheet.create({
  fileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  fileInfoContainer: {
    display: 'flex',
    width: '85%',
    flexDirection: 'column',
    marginLeft: 10,
  },
  name: {
    fontSize: 14,
  },
  additionalInfo: {
    fontSize: 13,
  },
  fileIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light_smoke,
    borderRadius: 40
  }
})