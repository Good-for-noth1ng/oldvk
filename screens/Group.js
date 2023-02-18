import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { COLORS } from '../constants/theme'
import CustomHeader from '../components/CustomHeader'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Group = ({navigation}) => {
  const accessToken = useSelector(state => state.user.accessToken)
  const groupID = useSelector(state => state.group.id) 
  const fetchGroupWallContent = ``
  const [isLoading, setIsLoading] = useState(true)
  const goBack = () => {
    navigation.goBack()
  }
  // useEffect(() => {
  //   fetch(fetchGroupWallContent)
  //   .then(response => response.json())
  //   .then(data => data.response)
  //   .then()
  // }, [])

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.primary} barStyle={COLORS.white}/>
      <CustomHeader 
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
        headerName={<Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Community</Text>}
      />
      {
        isLoading ?
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={COLORS.primary} size={50}/>
        </View> : null
      }
    </SafeAreaView>
  )
}

export default Group

const styles = StyleSheet.create({
  spinnerContainer: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})