import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomHeader from '../components/CustomHeader'
import { COLORS } from '../constants/theme'

const Account = ({navigation}) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const [isLoading, setIsloading] = useState(true)
  const goBack = () => {
    navigation.pop()
  }
  return (
    <SafeAreaView style={isLightTheme ? styles.mainContainerLight : styles.manContainerDark}>
      <StatusBar backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark}/>
      <CustomHeader
        isLightTheme={isLightTheme}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        headerName={<Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Account</Text>}
        iconTouchHandler={goBack}
      />
      {
        isLoading ?
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
        </View> :
        null
      }
    </SafeAreaView>
  )
}

export default Account

const styles = StyleSheet.create({
  mainContainerLight: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  manContainerDark: {
    flex: 1,
    backgroundColor: COLORS.background_dark
  },
  spinnerContainer: {
    width: '100%',
    height: '90%',
    justifyContent: 'center'
  }
})