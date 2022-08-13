import { View, Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import Header from '../components/Header'
import { LoginButton } from '../components/Buttons'
import { SIZES } from '../constants/theme'
import { APP_ID } from '@env'

const Login = () => {
  const iconSrc = '../assets/icons/vk_logo_eng_blue.png'
  const openAuthSession = async () => {
    try {
      const url = ''
      let result = await WebBrowser.openAuthSessionAsync()
    } catch (error) {
      console.log(error)
    }
  }
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
          <LoginButton buttonText={'Авторизоваться через vk.com'} />
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