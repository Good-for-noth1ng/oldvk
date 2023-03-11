import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CustomHeader from '../components/CustomHeader'
import { OptionsButton } from '../components/Buttons'
import { COLORS } from '../constants/theme'

const Options = ({navigation}) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const handleDrawerOpening = () => {
    navigation.openDrawer()
  }
  const navigateToAccount = () => {
    navigation.navigate('Account')
  }
  const navigateToSecurity = () => {
    navigation.navigate('Security')
  }
  const navigateToPrivacy = () => {
    navigation.navigate('Privacy')
  }
  const navigateToNotifications = () => {
    navigation.navigate('Notifications')
  }
  const navigateToBlackList = () => {
    navigation.navigate('Blacklist')
  }
  return (
    <SafeAreaView style={isLightTheme ? styles.mainContainerLight : styles.mainContainerDark}>
      <StatusBar backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} barStyle={COLORS.white}/>
      <CustomHeader 
        headerName={<Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Options</Text>}
        iconComponent={<Entypo name='menu' color={COLORS.white} size={30}/>}
        iconTouchHandler={handleDrawerOpening}
        isLightTheme={isLightTheme}
      /> 
      <View style={styles.buttonsContainer}>
        <OptionsButton 
          buttonIcon={<FontAwesome5 name='user-alt' size={22} color={COLORS.secondary} style={styles.icon}/>}
          buttonText={'Учетная запись'}
          isLightTheme={isLightTheme}
          buttonPressHandler={navigateToAccount}
        />
        <OptionsButton 
          buttonIcon={<FontAwesome5 name='lock' size={22} color={COLORS.secondary} style={styles.icon}/>}
          buttonText={'Безопасность'}
          isLightTheme={isLightTheme}
          buttonPressHandler={navigateToSecurity}
        />
        <OptionsButton 
          buttonIcon={<Ionicons name='hand-left' size={22} color={COLORS.secondary} style={styles.icon}/>}
          buttonText={'Приватность'}
          isLightTheme={isLightTheme}
          buttonPressHandler={navigateToPrivacy}
        />
        <OptionsButton 
          buttonIcon={<FontAwesome name='bell' size={22} color={COLORS.secondary} style={styles.icon}/>}
          buttonText={'Оповещения'}
          isLightTheme={isLightTheme}
          buttonPressHandler={navigateToNotifications}
        />
        <OptionsButton 
          buttonIcon={<FontAwesome5 name='user-slash' size={22} color={COLORS.secondary} style={styles.icon}/>}
          buttonText={'Черный список'}
          isLightTheme={isLightTheme}
          buttonPressHandler={navigateToBlackList}
        />
      </View>
    </SafeAreaView>
  )
}

export default Options

const styles = StyleSheet.create({
  mainContainerLight: {
    flex: 1,
    backgroundColor: COLORS.light_smoke
  },
  mainContainerDark: {
    flex: 1,
    backgroundColor: COLORS.background_dark
  },
  buttonsContainer: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: COLORS.white
  },
  icon: {
    marginLeft: 5, 
    marginRight: 10,
  },
})