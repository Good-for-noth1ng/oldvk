import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../constants/theme'
const TextInputField = () => {
  const inputField = useRef('')
  const [colorOfSendButton, setColorOfSendButton] = useState(false)
  const handleChanges = (text) => {
    if (text !== '') {
      setColorOfSendButton(true)
    } else if (text === '') {
      setColorOfSendButton(false)
    }
  }
  return (
    <View style={styles.inputContainer}>
      <Feather name='paperclip' color={COLORS.secondary} size={25}/>
      <TextInput 
        ref={inputField}
        style={styles.input}
        placeholder={'Comment'}
        placeholderTextColor={COLORS.smoke}
        selectionColor={COLORS.secondary}
        onChangeText={handleChanges}
        multiline={true}
      />
      <Ionicons name='send' color={colorOfSendButton ? COLORS.primary : COLORS.secondary} size={25}/>
    </View>
  )
}

export default TextInputField

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        width: '75%',
        height: 40,
        fontSize: 17,
        // backgroundColor: COLORS.light_smoke
    }
})