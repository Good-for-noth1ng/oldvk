import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLORS } from '../constants/theme'
import uuid from 'react-native-uuid';

const PostFiles = ({postDocs}) => {
  let renderDocs = []
  for (let i = 0; i < postDocs.length; i++) {
    let doc = postDocs[i]
    let name = doc.title
    name = name.slice(0, 35)
    if (name !== doc.title) {
      name += '...' 
    }
    let size = doc.size
    let quantities = ['b', 'kb', 'mb', 'gb']
    let quantity = 'b'
    for (let i =0; i < 3; i++) {
      if (size >= 1000) {
        size = Math.round(size / 10) / 100
        quantity = quantities[i + 1]
      }  
    }

    let file = (
      <TouchableOpacity key={uuid.v4()} style={styles.fileContainer} activeOpacity={1}>
       <View style={styles.fileIconContainer}>
         <FontAwesome name='file' size={22} color={COLORS.secondary} />
       </View>
       <View style={styles.fileInfoContainer}>
         <Text style={styles.nameStyle}>{name}</Text>
         <View style={styles.sizeFormatContainer}>
           <Text style={{marginRight: 4}}>{doc.ext}</Text>
           <Text>{size}</Text>
           <Text>{quantity}</Text>
         </View>
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
  sizeFormatContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  nameStyle: {
    fontSize: 14,
    // fontWeight: '700',
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