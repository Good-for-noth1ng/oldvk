import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import uuid from 'react-native-uuid';
import GroupListItem from '../components/GroupListItem';
import { COLORS } from '../constants/theme';

const Groups = () => {
  const accessToken = useSelector(state => state.user.accessToken)
  const [isLoading, setIsLoading] = useState(true)
  const [groupsData, setGroupsData] = useState(null)
  
  useEffect(() => {
    fetchGroupIds()
  }, [])
  
  const fetchGroupIds = async () => {
    const getIdsUrl = `https://api.vk.com/method/groups.get?access_token=${accessToken}&v=5.131`
    let response = await fetch(getIdsUrl)
    let data = await response.json()
    const groupsNum = data.response.count
    const listIds = data.response.items
    let ids = ''
    for (let i = 0; i < groupsNum; i++) {
      ids += listIds[i]
      if (i !== groupsNum - 1) {
        ids += ','
      }
    }
    let getGroupUrl = `https://api.vk.com/method/groups.getById?group_ids=${ids}&access_token=${accessToken}&v=5.131`
    response = await fetch(getGroupUrl)
    data = await response.json()
    setIsLoading(false)
    setGroupsData(data.response)
  }
  const renderItem = ({item}) => (
    <GroupListItem data={item}/>
  )
  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={COLORS.primary}/>
        {
          isLoading ? 
          <View style={styles.spinnerContainer}>
            <ActivityIndicator color={COLORS.primary} size={50}/>
          </View> :
          <View>
            <FlatList 
              data={groupsData}
              renderItem={renderItem}
              key={uuid.v4()}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={isLoading} />
              }
            />
          </View>
        }
      </SafeAreaView>
    </View>
  )
}

export default Groups

const styles = StyleSheet.create({
  spinnerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
})