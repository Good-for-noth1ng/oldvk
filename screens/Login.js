import React from 'react'
import { View, Text, SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native'
// import { authorize } from 'react-native-app-auth'
// import * as Linking from 'expo-linking'
// import * as WebBrowser from 'expo-web-browser'
// import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../components/Header'
import { LoginButton } from '../components/Buttons'
import { SIZES, COLORS } from '../constants/theme'
import { toggleCurrentColorScheme } from '../redux/colorSchemeSlice'

const Login = ({navigation}) => {
  const dispatch = useDispatch() 
  let colorScheme = useColorScheme()
  if (colorScheme === 'dark') {
    dispatch(toggleCurrentColorScheme())
  }
  const isLightTheme = colorScheme !== 'light';
  return (
    // <View>
    <SafeAreaView style={isLightTheme ? styles.mainContainerLight : styles.mainContainerDark}>
      <StatusBar backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} barStyle={COLORS.white}/>
        <Header screenName={'Авторизация'} isLight={isLightTheme}/>
        <View style={styles.heroButtonContainer}>
          <View style={styles.textContainer}>
            <Text style={isLightTheme ? styles.textHeaderLight : styles.textHeaderDark}>Добро пожаловать!</Text>
            <Text style={isLightTheme ? styles.subtitleLight : styles.subtitleDark}>
              oldvk - мобильное приложение для соцсети вконтакте
            </Text>
          </View>
          <LoginButton buttonText={'Авторизоваться через vk.com'} isLightTheme={isLightTheme}  navigation={navigation}/>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainerLight: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  mainContainerDark: {
    flex: 1,
    backgroundColor: COLORS.background_dark
  },
  heroButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '45%',
    marginTop: 160
  },
  textContainer: {
    width: '65%',
    display: 'flex',
    height: '45%',
    justifyContent: 'space-between',
  },
  textHeaderLight: {
    fontSize: SIZES.extraLarge,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.black
  },
  textHeaderDark: {
    fontSize: SIZES.extraLarge,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.primary_text
  },
  subtitleLight: {
    fontSize: SIZES.medium,
    textAlign: 'center',
    color: COLORS.black,  
  },
  subtitleDark: {
    fontSize: SIZES.medium,
    textAlign: 'center',
    color: COLORS.primary_text,
  }
});

export default Login