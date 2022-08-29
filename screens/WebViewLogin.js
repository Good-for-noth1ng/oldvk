import { StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import { WebView } from 'react-native-webview'
import { APP_ID, PERMISION_CODE, REDIRECT_URI } from '@env'
import { useDispatch } from 'react-redux'
import { setAccessToken, setExpiresIn, setLogin, setUserId } from '../redux/slices'

const WebViewLogin = () => {
  const dispatch = useDispatch();
  const onNavChange = (navigationState) => {
    const regex = /^https:\/\/oauth\.vk\.com\/blank\.html.*$/g
    const url = navigationState.url
    if (regex.test(url)) {
      const accessTokenRegex = /access_token=[a-zA-Z0-9-._]*/g;
      const expiresInRegex = /expires_in=\d*/g;
      const userIdRegex = /user_id=.*/g;
      const accessToken = url.match(accessTokenRegex)[0].split('access_token=')[1];
      const expiresIn = url.match(expiresInRegex)[0].split('expires_in=')[1];
      const userId = url.match(userIdRegex)[0].split('user_id=')[1];
      dispatch(setAccessToken(accessToken));
      dispatch(setExpiresIn(expiresIn));
      dispatch(setUserId(userId));
      dispatch(setLogin());
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