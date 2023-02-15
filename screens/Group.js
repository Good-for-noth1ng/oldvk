import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { COLORS } from '../constants/theme'
import CustomHeader from '../components/CustomHeader'

const Group = () => {
  const accessToken = useSelector(state => state.user.accessToken)
  const groupID = useSelector(state => state.group.id) 
  const fetchGroupWallContent = ``
  
  useEffect(() => {
    fetch(fetchGroupWallContent)
    .then(response => response.json())
    .then(data => data.response)
    .then()
  }, [])

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.primary} barStyle={COLORS.white}/>
      <CustomHeader />
    </SafeAreaView>
  )
}

export default Group

const styles = StyleSheet.create({})