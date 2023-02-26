import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, ActivityIndicator, RefreshControl, BackHandler } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import uuid from 'react-native-uuid';
import GroupListItem from '../components/GroupListItem';
import { COLORS } from '../constants/theme';
import DividerWithLine from '../components/DividerWithLine';
import CustomHeader from '../components/CustomHeader';
import Entypo from 'react-native-vector-icons/Entypo'

const GroupList = ({navigation}) => {
  const accessToken = useSelector(state => state.user.accessToken)
  const [isLoading, setIsLoading] = useState(true)
  const [groupsData, setGroupsData] = useState(null)
  const drawerNavigator = navigation.getParent()
  const searchInputField = useRef(null)

  useEffect(() => {
    fetchGroupIds()
  }, [])
  
  const refreshGroupList = () => {
    setIsLoading(true)
    fetchGroupIds()
  }

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
    let getGroupUrl = `https://api.vk.com/method/groups.getById?group_ids=${ids}&access_token=${accessToken}&fields=members_count,activity&v=5.131`
    response = await fetch(getGroupUrl)
    data = await response.json()
    setIsLoading(false)
    setGroupsData(data.response)
  }

  const openDrawer = () => {
    drawerNavigator.openDrawer()
  }

  const renderItem = ({item}) => (
    <GroupListItem data={item} navigation={navigation}/>
  )

  const groupListSeparator = () => (
    <DividerWithLine dividerHeight={10} marginL={5} marginR={5} dividerColor={COLORS.white}/>
  )

  const footer = () => (
    <DividerWithLine dividerHeight={10} marginL={5} marginB={10} marginR={5} dividerColor={COLORS.white}/>
  )

  const debounce = (func, delay=500) => {
    let debounceTimer
    return (...args) => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {func(...args)}, delay)
    };
  }
  
  const saveInput = async (query) => {
    const groupSearchUrl = `https://api.vk.com/method/groups.search?q=${query}&access_token=${accessToken}&v=5.131` 

    if (!(query.replace(/\s/g, '') === '')) {      
      setIsLoading(true)
      const searchResponse = await fetch(groupSearchUrl)
      const searchData = await searchResponse.json()
      const groupsNum = searchData.response.count
      const groupsItems = searchData.response.items
      let ids = ''
      for(let i = 0; i < groupsItems.length; i++) {
        ids += groupsItems[i].id
        if(i !== groupsItems.length - 1) {
          ids += ','
        }
      }
      let getGroupUrl = `https://api.vk.com/method/groups.getById?group_ids=${ids}&access_token=${accessToken}&fields=members_count,activity&v=5.131`
      const groupsListResponse = await fetch(getGroupUrl)
      const data = await groupsListResponse.json()
      setGroupsData(data.response)
      setIsLoading(false)
      
    }
    
  }
  const handleInputChange = debounce((...args) => saveInput(...args))
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={COLORS.white}/>
      <CustomHeader 
        headerName={
          <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Communities</Text>
        }
        iconComponent={
          <Entypo name='menu' color={COLORS.white} size={30}/>
        }
        iconTouchHandler={openDrawer}
        showSearchIcon={true}
        handleInputChange={handleInputChange}
      />
      {
        isLoading ? 
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={COLORS.primary} size={50}/>
        </View> :
        <FlatList 
          data={groupsData}
          renderItem={renderItem}
          key={uuid.v4()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={groupListSeparator}
          refreshControl={
            <RefreshControl 
              refreshing={isLoading}
              onRefresh={refreshGroupList}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary} 
            />
          }    
          ListFooterComponent={footer}
        />
      }
    </SafeAreaView>
  )
}

export default GroupList

const styles = StyleSheet.create({
  spinnerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  mainContainer: {
    flex: 1,
  }
})