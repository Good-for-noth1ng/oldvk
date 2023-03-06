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
  return (
    // <View>
    <SafeAreaView style={colorScheme !== 'light' ? styles.mainContainerLight : styles.mainContainerDark}>
      <StatusBar backgroundColor={colorScheme !== 'light' ? COLORS.primary : COLORS.black} barStyle={COLORS.white}/>
        <Header screenName={'Авторизация'} theme={colorScheme}/>
        <View style={styles.heroButtonContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeader}>Добро пожаловать!</Text>
            <Text style={styles.subtitle}>
              oldvk - мобильное приложение для соцсети вконтакте
            </Text>
          </View>
          <LoginButton buttonText={'Авторизоваться через vk.com'}  navigation={navigation}/>
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
    backgroundColor: COLORS.very_dark_gray
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
    textAlign: 'center'
  },
  subtitle: {
    fontSize: SIZES.medium,
    textAlign: 'center'
  }
});

export default Login