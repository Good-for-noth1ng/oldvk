import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import uuid from 'react-native-uuid';
import Entypo from 'react-native-vector-icons/Entypo'
import CustomHeader from '../components/CustomHeader'
import UserListItem from '../components/UserListItem'
import DividerWithLine from '../components/DividerWithLine'
import { COLORS } from '../constants/theme'

const Friends = ({navigation}) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const [isLoading, setIsLoading] = useState(true)
  const [friendsData, setFriendsData] = useState(null)
  const fetchFriendsUrl = `https://api.vk.com/method/friends.get?access_token=${accessToken}&v=5.131`
  const handleDrawerOpening = () => {
    navigation.openDrawer()
  }

  const fetchFriends = async () => {
    const response = await fetch(fetchFriendsUrl)
    const data = await response.json()
    if (data.response.items.length === 0) {
      setFriendsData(null)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchFriends()
  }, [])
  const listSeparator = () => (
    <DividerWithLine dividerHeight={10} dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}/>
  )

  const footer = () => (
    <DividerWithLine 
      dividerHeight={10} 
      marginB={10} 
      borderBL={5} 
      borderBR={5} 
      dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
    />
  )

  const renderItem = ({item}) => (
    <UserListItem 
      imgUrl={item.photo_100} 
      firstName={item.first_name} 
      lastName={item.last_name}
      id={item.id}
      navigation={navigation}
      isLightTheme={isLightTheme} 
      bdate={item.bdate}
      city={item.city}
    />
  )

  const debounce = (func, delay=700) => {
    let debounceTimer
    return (...args) => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {func(...args)}, delay)
    };
  }
  
  const saveInput = async (query) => {
    const usersSearchUrl = `https://api.vk.com/method/users.search?q=${query}&access_token=${accessToken}&v=5.131&fields=bdate,city,photo_100` 

    if (!(query.replace(/\s/g, '') === '')) {      
      setIsLoading(true)
      const searchResults = await fetch(usersSearchUrl)
      const searchData = await searchResults.json()
      setFriendsData(searchData.response.items)
      setIsLoading(false)
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
      {
        isLoading ?
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
        </View> :
        friendsData === null ?
        <View>
          <Text>No Friends</Text>
        </View>
         :
        <FlatList 
          key={uuid.v4()}
          style={styles.list}
          data={friendsData}
          renderItem={renderItem}
          ItemSeparatorComponent={listSeparator}
          ListFooterComponent={footer}
        />
      }
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
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  list: {
    marginLeft: 5,
    marginRight: 5
  }
})