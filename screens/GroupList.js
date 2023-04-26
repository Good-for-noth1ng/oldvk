import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, ActivityIndicator, RefreshControl, BackHandler } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import uuid from 'react-native-uuid';
import GroupListItem from '../components/GroupListItem';
import { COLORS } from '../constants/theme';
import DividerWithLine from '../components/DividerWithLine';
import CustomHeader from '../components/CustomHeader';
import Entypo from 'react-native-vector-icons/Entypo'
import SearchResultHeaderCounter from '../components/SearchResultHeaderCounter';

const GroupList = ({navigation}) => {
  const accessToken = useSelector(state => state.user.accessToken)
  const [isLoading, setIsLoading] = useState(true)
  const [groupsData, setGroupsData] = useState(null)
  const drawerNavigator = navigation.getParent()
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const [groupsCount, setGroupsCount] = useState(null)
  const remainToFetchNum = useRef()
  const offset = useRef(0)
  const count = 30
  const [groupsCounterName, setGroupsCounterName] = useState('All communities')
  
  useEffect(() => {
    fetchGroupIds()
  }, [])
  
  const refreshGroupList = () => {
    setIsLoading(true)
    fetchGroupIds()
  }

  //TODO: fix several rerenders
  const fetchGroupIds = async () => {
    offset.current = 0
    const getIdsUrl = `https://api.vk.com/method/groups.get?access_token=${accessToken}&v=5.131&extended=1&fields=activity,members_count&count=${count}&offset=${offset.current}`
    let response = await fetch(getIdsUrl)
    let data = await response.json()
    remainToFetchNum.current = data.response.count - count
    offset.current += count
    setGroupsData(data.response.items)
    setGroupsCount(data.response.count)
    setGroupsCounterName('All communities')
    setIsLoading(false)
  }

  const openDrawer = () => {
    drawerNavigator.openDrawer()
  }

  const listHeader = () => {
    return (
      <>
        <DividerWithLine 
          dividerHeight={10} 
          marginT={10} 
          borderTL={5} 
          borderTR={5} 
          dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
        />
        <SearchResultHeaderCounter 
          isLightTheme={isLightTheme}
          counterNum={groupsCount}
          counterName={groupsCounterName} 
        />
        <DividerWithLine 
          dividerHeight={10}  
          dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
        />
      </>  
    )
  }

  const renderItem = ({item}) => (
    <GroupListItem data={item} navigation={navigation} isLightTheme={isLightTheme}/>
  )

  const groupListSeparator = () => (
    <DividerWithLine dividerHeight={10} dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}/>
  )

  const footer = () => {
    if (remainToFetchNum.current > 0) {
      return (
        <>
          <View style={isLightTheme ? styles.bottomSpinnerContainerDark : styles.bottomSpinnerContainerDark}>
            <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white}/>
          </View>
          <DividerWithLine dividerHeight={5} marginB={5} borderBL={5} borderBR={5}/>
        </>
      )
    }
    return (
      <DividerWithLine 
        dividerHeight={10} 
        marginB={10} 
        borderBL={5} 
        borderBR={5} 
        dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
      />
    )
  }

  const debounce = (func, delay=700) => {
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
      setGroupsCount(groupsNum)
      setGroupsCounterName('Search result')
      setGroupsData(data.response)
      setIsLoading(false)
    }
    
  }

  const handleInputChange = debounce((...args) => saveInput(...args))
  
  return (
    <SafeAreaView style={isLightTheme ? styles.mainContainerLight : styles.mainContainerDark}>
      <StatusBar backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} barStyle={COLORS.white}/>
      <CustomHeader
        isLightTheme={isLightTheme} 
        headerName={
          <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Communities</Text>
        }
        iconComponent={
          <Entypo name='menu' color={COLORS.white} size={30}/>
        }
        iconTouchHandler={openDrawer}
        showSearchIcon={true}
        handleInputChange={handleInputChange}
        navigation={navigation}
        gapForSearchIcon={'35%'}
      />
      {
        isLoading ? 
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
        </View> :
        <FlatList 
          data={groupsData}
          renderItem={renderItem}
          key={uuid.v4()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={groupListSeparator}
          ListHeaderComponent={listHeader}
          refreshControl={
            <RefreshControl 
              refreshing={isLoading}
              onRefresh={refreshGroupList}
              colors={[COLORS.primary, COLORS.white]}
              tintColor={isLightTheme ? COLORS.primary : COLORS.white} 
            />
          }    
          style={styles.list}
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
  mainContainerLight: {
    flex: 1,
    backgroundColor: COLORS.light_smoke
  },
  mainContainerDark: {
    flex: 1,
    backgroundColor: COLORS.background_dark
  },
  list: {
    marginLeft: 5,
    marginRight: 5,
  },
  listHeaderCounterTextLight: {
    fontSize: 14,
    color: COLORS.black,
  },
  listHeaderCounterTextDark: {
    fontSize: 14,
    color: COLORS.white
  },
  bottomSpinnerContainerLight: {
    justifyContent: 'center',
    backgroundColor: COLORS.white
  },
  bottomSpinnerContainerDark: {
    justifyContent: 'center',
    backgroundColor: COLORS.white
  }
})