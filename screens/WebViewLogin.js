import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview'
import queryString from 'query-string'
import { APP_ID, PERMISION_CODE, REDIRECT_URI } from '@env'

const WebViewLogin = () => {
  const onNavChange = (navigationState) => {
    const regex = /^https:\/\/oauth\.vk\.com\/blank\.html.*$/g
    const url = navigationState.url
    if (regex.test(url)) {
      const accessTokenRegex = /access_token=[a-zA-Z0-9-.]*/g
      const expiresInregex = /expires_in=\d*/g
      const userId = /user_id=.*/g
    }
  }

  return (
    <View style={{flex: 1}}>
      <WebView 
        source={{uri: `https://oauth.vk.com/authorize?client_id=${APP_ID}&display=mobile&redirect_uri=${REDIRECT_URI}&scope=${PERMISION_CODE}&response_type=token&v=5.131&revoke=1`}}
        onNavigationStateChange={onNavChange}
      />      
    </View>
  )
}

export default WebViewLogin

const styles = StyleSheet.create({})