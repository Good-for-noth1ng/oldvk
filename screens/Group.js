import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

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
    <View>
      <Text>Group</Text>
    </View>
  )
}

export default Group

const styles = StyleSheet.create({})