import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as FileSystem from 'expo-file-system'
import { shareAsync } from 'expo-sharing'
import { COLORS } from '../constants/theme'
import uuid from 'react-native-uuid';

const PostFiles = ({postDocs, isLightTheme}) => {
  let renderDocs = []
  for (let i = 0; i < postDocs.length; i++) {
    let doc = postDocs[i]
    let name = doc.title
    name = name.slice(0, 35)
    if (name !== doc.title) {
      name += '...' 
    }
    let size = doc.size
    let quantities = ['B', 'KB', 'MB', 'GB']
    let quantity = 'B'
    for (let i =0; i < 3; i++) {
      if (size >= 1000) {
        size = Math.round(size / 10) / 100
        quantity = quantities[i + 1]
      }  
    }
    // console.log(postDocs[i].url)
    const downloadFromUrl = async () => {
      // console.log('asdas')
      const fileName = name
      const result = await FileSystem.downloadAsync(
        postDocs[i].url,
        FileSystem.documentDirectory + fileName
      )
      console.log(result.headers["content-type"])

      save(result.uri, fileName, result.headers["content-type"])
    }
    const save = async (uri, filename, mimetype) => {
      if (Platform.OS === "android") {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()
        if (permissions.granted) {
          // await FileSystem.DownloadResumable.
          // const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64})
          // await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
          // .then(async uri => {
          //   await FileSystem.writeAsStringAsync(uri, base64, {encoding: FileSystem.EncodingType.Base64})
          // })
          // .then(() => {
          //   console.log('Downloaded')
          // })
          // .catch(e => console.log(e))
        } 
      } else {
        shareAsync(uri);
      }
    }
    let file = (
      <TouchableOpacity key={uuid.v4()} style={styles.fileContainer} activeOpacity={0.8} onPress={downloadFromUrl}>
       <View style={styles.fileIconContainer}>
         <FontAwesome name='file' size={22} color={COLORS.secondary} />
       </View>
       <View style={styles.fileInfoContainer}>
         <Text style={isLightTheme ? styles.nameLight : styles.nameDark}>{name}</Text>
          <Text style={isLightTheme ? styles.additionalInfoLight : styles.additionalInfoDark}>{doc.ext} {size} {quantity}</Text>
       </View>
     </TouchableOpacity>
    )
    renderDocs.push(file)
  }
  return (
    <View>
      {renderDocs && renderDocs}
    </View>
  )
}

export default PostFiles

const styles = StyleSheet.create({
  fileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
    // backgroundColor: COLORS.light_smoke
  },
  fileInfoContainer: {
    display: 'flex',
    width: '85%',
    flexDirection: 'column',
    marginLeft: 10,
    // backgroundColor: COLORS.secondary

  },
  nameLight: {
    fontSize: 14,
    color: COLORS.black,
    // fontWeight: '700',
  },
  nameDark: {
    fontSize: 14,
    color: COLORS.primary_text,
  },
  additionalInfoLight: {
    fontSize: 13,
    color: COLORS.black
  },
  additionalInfoDark: {
    fontSize: 13,
    color: COLORS.primary_text
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