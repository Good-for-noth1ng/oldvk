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
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'

const Login = ({navigation}) => {
  const dispatch = useDispatch() 
  const colorScheme = useColorScheme()
  if (colorScheme === 'dark') {
    dispatch(toggleCurrentColorScheme())
  }

  const isLightTheme = colorScheme === 'light'

  return (
    // <View>
    <SafeAreaView style={[styles.mainContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.background_dark}]}>
      <Header screenName={'Авторизация'} isLight={isLightTheme}/>
      <View style={styles.heroButtonContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.textHeader, isLightTheme ? {color: COLORS.black} : {color: COLORS.primary_text}]}>
            Добро пожаловать!
          </Text>
          <Text style={[styles.subtitle, isLightTheme ? {color: COLORS.black} : {color: COLORS.primary_text}]}>
            oldvk - мобильное приложение для соцсети вконтакте
          </Text>
        </View>
        <LoginButton buttonText={'Войти через vk.com'} isLightTheme={isLightTheme}  navigation={navigation}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
  textHeader: {
    fontSize: SIZES.extraLarge,
    fontWeight: '700',
    textAlign: 'center',
    // color: COLORS.black
  },
  // textHeaderDark: {
  //   fontSize: SIZES.extraLarge,
  //   fontWeight: '700',
  //   textAlign: 'center',
  //   color: COLORS.primary_text
  // },
  subtitle: {
    fontSize: SIZES.medium,
    textAlign: 'center',
    color: COLORS.black,  
  },
  // subtitle: {
  //   fontSize: SIZES.medium,
  //   textAlign: 'center',
  //   color: COLORS.primary_text,
  // }
});

export default Login