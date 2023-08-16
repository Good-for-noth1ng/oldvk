import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, StatusBar, FlatList, RefreshControl } from 'react-native'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'
import CustomHeader from '../components/CustomHeader'
import DividerWithLine from '../components/DividerWithLine'
import { findPostAuthor } from '../utils/dataPreparationForComponents';
import Post from '../components/Post'
import Repost from '../components/Repost';
import { COLORS } from '../constants/theme'

const Favorites = ({navigation}) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const currentUserId = useSelector(state => state.user.userId)
  const [isLoading, setIsLoading] = React.useState(true)
  const [favorites, setFavorites] = React.useState([])
  const count = 10
  const offset = React.useRef(0)
  const remainToFetchNum = React.useRef(null)
  const shouldRemoveStackScreens = useRef()

  const refreshFavs = () => {
    setIsLoading(true)
    setFavorites([])
    remainToFetchNum.current = null
    offset.current = 0
    fetchFave()
  }

  const fetchFave = async () => {
    const fetchFaveUrl = `https://api.vk.com/method/fave.get?access_token=${accessToken}&v=5.131&extended=1&fields=photo_100&count=${count}&offset=${offset.current}`
    const response = await fetch(fetchFaveUrl)
    const parsedResponse = await response.json()
    if (remainToFetchNum.current === null) {
      remainToFetchNum.current = parsedResponse.response.count
    } else {
      remainToFetchNum.current -= count
    }
    offset.current += count
    const items = parsedResponse.response.items.map(item => {
      let preparedItem
      if (item.type === 'post') {
        preparedItem = findPostAuthor(item.post, parsedResponse.response.profiles, parsedResponse.response.groups)
      }
      return preparedItem
    })
    setFavorites(prevState => prevState.concat(items))
    setIsLoading(false)
  }

  React.useEffect(() => {
    fetchFave()
  }, [])

  React.useEffect(() => {
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

  const openDrawer = () => {
    navigation.openDrawer()
  }

  const renderItem = ({item}) => {
    if (item.copy_history === undefined) {
      return (
        <Post 
          data={item}
          isLigthTheme={isLightTheme}
          navigation={navigation}
          id={item.key}
          openedPost={true}
          accessToken={accessToken}
        />
      )
    }
    return (
      <Repost 
        data={item}
        isLigthTheme={isLightTheme}
        navigation={navigation}
        id={item.key}
        openedPost={true}
        accessToken={accessToken}
      />
    )
  }

  const listFooter = () => {
    return (
      <DividerWithLine dividerHeight={5}/>
    )
  }
  return (
    <SafeAreaView style={[
      {flex: 1},
      isLightTheme ? {backgroundColor: COLORS.light_smoke} : {backgroundColor: COLORS.background_dark}
    ]}>
      <StatusBar barStyle={COLORS.white} backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark}/>
      <CustomHeader 
        isLightTheme={isLightTheme}
        headerName={<Text style={styles.headerTextStyle}>Favorites</Text>}
        iconComponent={<Entypo name='menu' color={COLORS.white} size={30}/>}
        iconTouchHandler={openDrawer}
        isScreenFromDrawerMenu={true}
        navigation={navigation}
      />
      {
        isLoading ?
        <View style={[styles.spinnerContainer, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
          <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
        </View> :
        <FlatList 
          data={favorites}
          renderItem={renderItem}
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={listFooter}
          refreshControl={
            <RefreshControl 
              refreshing={isLoading}
              onRefresh={refreshFavs}
              colors={[COLORS.primary, COLORS.white]} 
              tintColor={isLightTheme ? COLORS.primary : COLORS.white}
            />
          }
        />
      }
    </SafeAreaView>
  )
}

export default Favorites

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    height: '100%'
  },
  listContainer: {
    marginLeft: 5,
    marginRight: 5,
  },
})