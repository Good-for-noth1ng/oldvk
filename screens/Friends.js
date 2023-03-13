import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'
import CustomHeader from '../components/CustomHeader'
import { COLORS } from '../constants/theme'

const Friends = ({navigation}) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const [isLoading, setIsLoading] = useState(true)
  const [friendsData, setFriendsData] = useState(null)
  
  const handleDrawerOpening = () => {
    navigation.openDrawer()
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
    //   setIsLoading(true)
    //   const searchResponse = await fetch(groupSearchUrl)
    //   const searchData = await searchResponse.json()
    //   const groupsNum = searchData.response.count
    //   const groupsItems = searchData.response.items
    //   let ids = ''
    //   for(let i = 0; i < groupsItems.length; i++) {
    //     ids += groupsItems[i].id
    //     if(i !== groupsItems.length - 1) {
    //       ids += ','
    //     }
    //   }
    //   let getGroupUrl = `https://api.vk.com/method/groups.getById?group_ids=${ids}&access_token=${accessToken}&fields=members_count,activity&v=5.131`
    //   const groupsListResponse = await fetch(getGroupUrl)
    //   const data = await groupsListResponse.json()
    //   setGroupsData(data.response)
    //   setIsLoading(false)
      
    }
  }
  const handleInputChange = debounce((...args) => saveInput(...args))
  
  return (
    <SafeAreaView style={isLightTheme ? styles.mainContainerLight : styles.mainContainerDark}>
      <StatusBar backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} barStyle={COLORS.white}/>
      <CustomHeader
         headerName={<Text style={styles.headerTextStyle}>Friends</Text>}
         isLightTheme={isLightTheme}
         iconComponent={<Entypo name='menu' color={COLORS.white} size={30}/>}
         iconTouchHandler={handleDrawerOpening}
         showSearchIcon={true}
         navigation={navigation}
         gapForSearchIcon={'45%'}
         handleInputChange={handleInputChange}
      />
    </SafeAreaView>
  )
}

export default Friends

const styles = StyleSheet.create({
  mainContainerLight: {
    flex: 1,
    backgroundColor: COLORS.light_smoke
  },
  mainContainerDark: {
    flex: 1,
    backgroundColor: COLORS.background_dark
  },
  headerTextStyle: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
  }
})