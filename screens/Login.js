import React from 'react'
import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { authorize } from 'react-native-app-auth'
import Header from '../components/Header'
import { LoginButton } from '../components/Buttons'
import { SIZES } from '../constants/theme'
import { APP_ID, PERMISION_CODE } from '@env'

const Login = () => {
  
  const config = {
    issuer: 'https://oauth.vk.com/authorize',
    client_id: APP_ID,
    redirect_uri: 'https://oauth.vk.com/blank.html',
    display: 'mobile',
    scope: 2,
    state: '12398',
    response_type: 'token',
    revoke: '1'
  }

  const openAuthSession = async () => {
    const result = await authorize(config)
    console.log(result.accessToken)
  }

  // const openAuthSession = async () => {
  //   try {
  //     const url = `https://oauth.vk.com/authorize?client_id=${APP_ID}&display=mobile&redirect_uri=https://oauth.vk.com/blank.html/callback&scope=${PERMISION_CODE}&response_type=token&v=5.131`
  //     let result = await WebBrowser.openAuthSessionAsync(url) 
  //     console.log(result)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    <View>
      <SafeAreaView>
        <StatusBar />
        <Header screenName={'Авторизация'} />
        <View style={styles.heroButtonContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textHeader}>Добро пожаловать!</Text>
            <Text style={styles.subtitle}>
              oldvk - мобильное приложение для соцсети вконтакте
            </Text>
          </View>
          <LoginButton buttonText={'Авторизоваться через vk.com'} handlePress={openAuthSession} />
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
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