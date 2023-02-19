import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, {useEffect, useState} from 'react'
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
    <DividerWithLine dividerHeight={10} marginL={5} marginR={5} dividerColor={COLORS.white}/>
  )
  return (
    <SafeAreaView>
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
})