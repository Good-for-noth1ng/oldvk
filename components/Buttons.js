import { Text, View, TouchableOpacity } from 'react-native'
import { SIZES, COLORS } from '../constants/theme'

export const LoginButton = ({buttonText, handlePress}) => {
  return (
    <TouchableOpacity style={{
      width: 170,
      height: 45,
      backgroundColor: COLORS.primary,
      borderRadius: 5,
      padding: 5,
      alignContent: 'center'
    }}>
      <Text style={{
        fontFamily: 'sans-serif',
        fontSize: SIZES.small + 2,
        color: COLORS.white,
        textAlign: 'center'
      }}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  )
}
