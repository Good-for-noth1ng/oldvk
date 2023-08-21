import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator, Animated, FlatList, RefreshControl, BackHandler } from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
// import { FlatList } from "react-native-gesture-handler";
import uuid from 'react-native-uuid';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomHeader from '../components/CustomHeader'
import SearchResultHeaderCounter from '../components/SearchResultHeaderCounter';
import UserListItem from '../components/UserListItem'
import DividerWithLine from '../components/DividerWithLine'
import Overlay from '../components/Overlay';
import { chooseButton } from '../redux/radioGenderButtonsSlice';
import { RadioOption, CollapsibleOption } from '../components/Buttons';
import { COLORS } from '../constants/theme'

const Friends = ({navigation, route}) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const currentUserId = useSelector(state => state.user.userId)
  const userId = route.params === undefined ? currentUserId : route.params.userId 
  const [isLoading, setIsLoading] = useState(true)
  const [friendsData, setFriendsData] = useState(null)
  const [friendsCount, setFriendsCount] = useState(null)
  const [friendsCounterName, setFriendsCounterName] = useState('All friends')
  const count = 10
  const offset = useRef(0)
  const remainToFetchNum = useRef()
  const searchQuery = useRef('')
  const connectionController = useRef(undefined)
  const filterIsOpen = useRef(false)

  const slideAnimation = useRef(new Animated.Value(2000)).current
  const shouldRemoveStackScreens = useRef()

  const genderRadioButtons = useSelector(state => state.radioGender.buttons)
  const chosenGenderId = useSelector(state => state.radioGender.chosenId)
  
  const relationshipButtons = useSelector(state => state.relationshipStatus.buttons)
  const chosenRelationshipId = useSelector(state => state.relationshipStatus.selectedId)

  const fromButton = useSelector(state => state.ageRange.fromButton)
  const toButton = useSelector(state => state.ageRange.toButton)

  const handleDrawerOpening = () => {
    navigation.openDrawer()
  }

  const goBack = () => {
    navigation.goBack()
  }

  const fetchFriends = async () => {
    const fetchFriendsUrl = `https://api.vk.com/method/friends.get?user_id=${userId}&access_token=${accessToken}&v=5.131&count=${count}&offset=${offset.current}&fields=name,bdate,city,photo_100`
    const response = await fetch(fetchFriendsUrl)
    const data = await response.json()
    const items = data.response.items.map(item => { return {...item, key: uuid.v4()}})
    offset.current += count
    return {
      items: items,
      count: data.response.count,
    }
  }

  const initFriendsList = async () => {
    offset.current = 0
    searchQuery.current = ''
    const fetchedFriendsList = await fetchFriends()
    if (fetchedFriendsList.count === 0) {
      setFriendsData(null)
      setIsLoading(false)
    } else {
      remainToFetchNum.current = fetchedFriendsList.count - count
      setFriendsCount(fetchedFriendsList.count)
      setFriendsData(fetchedFriendsList.items)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    initFriendsList()
  }, [])

  useEffect(() => {
    const drawerNavigator = navigation.getParent()
    const blur = drawerNavigator.addListener('blur', () => {
      shouldRemoveStackScreens.current = false
    })
    const focus = drawerNavigator.addListener('focus', () => {
      shouldRemoveStackScreens.current = true
    })
    const drawerItemPress = drawerNavigator.addListener('drawerItemPress', (e) => {
      if (shouldRemoveStackScreens.current) {
        navigation.popToTop()
      }
    })
    return blur, focus, drawerItemPress
  }, [navigation])

  const refreshFriendsList = () => {
    setIsLoading(true)
    initFriendsList()
  }

  const listSeparator = () => (
    <DividerWithLine dividerHeight={10} dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}/>
  )
  
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
          counterNum={friendsCount}
          counterName={friendsCounterName} 
        />
        <DividerWithLine 
          dividerHeight={10}  
          dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
        />
      </>  
    )
  }

  const footer = () => {
    if (remainToFetchNum.current > 0) {
      return (
        <>
          <View style={isLightTheme ? styles.bottomSpinnerContainerLight : styles.bottomSpinnerContainerDark}>
            <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={40}/>
          </View>
          <DividerWithLine 
            dividerHeight={5} 
            marginB={5} 
            borderBL={5} 
            borderBR={5} 
            dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
          />
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

  const fetchMoreUsers = async () => {
    if (searchQuery.current === '') {
      const fetchedFriendsList = await fetchFriends()
      remainToFetchNum.current -= count 
      setFriendsData(prevState => [...prevState, ...fetchedFriendsList.items])
    } else {
      const fetchedUsers = await getFriendsByQuery()
      remainToFetchNum.current -= count
      setFriendsData(prevState => [...prevState, ...fetchedUsers.items])
    }
  }

  const getFriendsByQuery = async () => {
    if (connectionController.current) {
      connectionController.current.abort()
    }
    connectionController.current = new AbortController()
    const signal = connectionController.current.signal
    const usersSearchUrl = `https://api.vk.com/method/users.search?q=${searchQuery.current}&access_token=${accessToken}&v=5.131&fields=bdate,city,photo_100&offset=${offset.current}&count=${count}&sex=${chosenGenderId}`
    const searchResults = await fetch(usersSearchUrl, { signal: signal })
    const searchData = await searchResults.json()
    offset.current += count
    const items = searchData.response.items.map(item => {return {...item, key: uuid.v4()}})
    return {
      counterName: 'Search result',
      count: searchData.response.count,
      items: items
    }
  }

  const debounce = (func, delay=700) => {
    let debounceTimer
    return (...args) => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {func(...args)}, delay)
    };
  }
  
  const saveInput = async (query) => {
    offset.current = 0
    searchQuery.current = query
    if (!(query.replace(/\s/g, '') === '')) {      
      setIsLoading(true)
      const fetchedByQueryUsers = await getFriendsByQuery()
      remainToFetchNum.current = fetchedByQueryUsers.count - count
      setFriendsData(fetchedByQueryUsers.items)
      setFriendsCount(fetchedByQueryUsers.count)
      setFriendsCounterName(fetchedByQueryUsers.counterName)
      setIsLoading(false)
    }
  }

  const handleInputChange = debounce((...args) => saveInput(...args))

  const keyExtractor = (item) => {
    return item.key
  }

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (filterIsOpen.current) {
          closeFilterMenu()
          return true
        }
      }
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () => subscription.remove()
  }, [filterIsOpen.current]))

  const openFilterMenu = () => {
    filterIsOpen.current = true
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  const closeFilterMenu = () => {
    filterIsOpen.current = false
    Animated.timing(slideAnimation, {
      toValue: 2000,
      duration: 500,
      useNativeDriver: true
    }).start()
  }
  
  return (
    <SafeAreaView style={isLightTheme ? styles.mainContainerLight : styles.mainContainerDark}>
      <StatusBar backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark} barStyle={COLORS.white}/>
      <CustomHeader
        headerName={<Text style={styles.headerTextStyle}>Friends</Text>}
        isLightTheme={isLightTheme}
        iconComponent={
          currentUserId === userId ? 
          <Entypo name='menu' color={COLORS.white} size={30}/> : 
          <AntDesign name='arrowleft' size={30} color={COLORS.white}/>
        }
        iconTouchHandler={currentUserId === userId ? handleDrawerOpening : goBack}
        showSearchIcon={true}
        navigation={navigation}
        gapForSearchIcon={'45%'}
        handleInputChange={handleInputChange}
        onCleaningInput={initFriendsList}
        onOptionsButton={openFilterMenu}
        isScreenFromDrawerMenu={userId === currentUserId}
      />
      {
        isLoading ?
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
        </View> :
        friendsData === null ?
        <View style={styles.noFriendsContainer}>
          <Text style={styles.noFriendsText}>No Friends</Text>
        </View>
         :
        <FlatList 
          style={styles.list}
          data={friendsData}
          renderItem={renderItem}
          ItemSeparatorComponent={listSeparator}
          ListFooterComponent={footer}
          ListHeaderComponent={listHeader}
          keyExtractor={keyExtractor}
          onEndReached={fetchMoreUsers}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.8}
          refreshControl={
            <RefreshControl 
              refreshing={isLoading}
              onRefresh={refreshFriendsList}
              colors={[COLORS.primary, COLORS.white]}
              tintColor={isLightTheme ? COLORS.primary : COLORS.white}
            />
          }
        />
      }
      <Overlay 
        slideAnimation={slideAnimation}
        handleShadowTouch={closeFilterMenu}
        isLightTheme={isLightTheme}
        headerText={'Filters'}
        actionButtonText={'Show Results'}
        overlayContentComponent={
          <>
            <RadioOption 
              headerText={'Gender'}
              buttonsData={genderRadioButtons}
              chosenElementId={chosenGenderId}
              changeColor={chooseButton}
            />
            <CollapsibleOption 
              headerText={'Relationship status'}
              buttons={[{id: 2651627278, buttonListItems: relationshipButtons}]}
            />
            <CollapsibleOption 
              headerText={'Age'}
              buttons={[fromButton, toButton]}
            />
          </>
        }
        
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
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  list: {
    marginLeft: 5,
    marginRight: 5
  },
  noFriendsContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'  
  },
  noFriendsText: {
    color: COLORS.secondary,
    fontSize: 17,
    fontWeight: 'bold',
  },
  bottomSpinnerContainerLight: {
    justifyContent: 'center',
    backgroundColor: COLORS.white
  },
  bottomSpinnerContainerDark: {
    justifyContent: 'center',
    backgroundColor: COLORS.primary_dark
  },
})