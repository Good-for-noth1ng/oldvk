import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, ActivityIndicator, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import CustomHeader from '../components/CustomHeader'
import OptionsListInputItem from '../components/OptionsListInputItem'
import DividerWithLine from '../components/DividerWithLine'
import { setAccountProperties } from '../redux/optionsSlice'
import { COLORS } from '../constants/theme'

const Account = ({navigation}) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const userInfo = useSelector(state => state.user)
  const accessToken = userInfo.accessToken
  const userPhotoUrl = userInfo.userProfileDrawerPhotoUrl
  const userName = `${userInfo.firstName} ${userInfo.lastName}`
  const userId = userInfo.userId
  const listItemsData = useSelector(state => state.options.account.items)
  const [isLoading, setIsloading] = useState(true)
  const getAccountSettingsUrl = `https://api.vk.com/method/account.getProfileInfo?access_token=${accessToken}&v=5.131`
  const dispatch = useDispatch()

  useEffect(() => {
    fetch(getAccountSettingsUrl)
    .then(response => response.json())
    .then(data => {
      dispatch(setAccountProperties(data.response))
      setIsloading(false)
    })
  }, [])

  const goBack = () => {
    navigation.pop()
  }

  const listHeaderComponent = () => (
    <View style={styles.userInfoContainer}>
      <Image source={{uri: userPhotoUrl}} style={styles.userImg}/>
      <View style={styles.userInfoTextContainer}>
        <Text style={isLightTheme ? styles.userNameLight : styles.userNameDark}>{userName}</Text>
        <Text style={styles.id}>ID: {userId}</Text>
      </View>
    </View>
  )

  const renderItem = ({item}) => {
    if (item.type === 'inputField') {
      return (
        <OptionsListInputItem value={item.value} title={item.name} handler={item.handler} isLightTheme={isLightTheme}/>
      )
    }
  }

  const listItemsSeparator = () => (
    <DividerWithLine dividerHeight={10}/>
  )

  const keyExtractor = (item) => {
    return item.key
  }

  return (
    <SafeAreaView style={isLightTheme ? styles.mainContainerLight : styles.mainContainerDark}>
      <StatusBar backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark}/>
      <CustomHeader
        isLightTheme={isLightTheme}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        headerName={<Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Account</Text>}
        iconTouchHandler={goBack}
        rightsideIconComponent={<Octicons name='check' color={COLORS.white} size={30}/>}
      />
      {
        isLoading ?
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50}/>
        </View> :
        <FlatList 
          data={listItemsData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          style={isLightTheme ? styles.listLight : styles.listDark}
          ItemSeparatorComponent={listItemsSeparator}
          ListHeaderComponent={listHeaderComponent}
        />
      }
    </SafeAreaView>
  )
}

export default Account

const styles = StyleSheet.create({
  mainContainerLight: {
    flex: 1,
    backgroundColor: COLORS.light_smoke
  },
  mainContainerDark: {
    flex: 1,
    backgroundColor: COLORS.background_dark
  },
  spinnerContainer: {
    width: '100%',
    height: '90%',
    justifyContent: 'center'
  },
  listLight: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    padding: 10,
    backgroundColor: COLORS.white
  },
  listDark: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    padding: 10,
    backgroundColor: COLORS.primary_dark
  },
  userInfoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  userInfoTextContainer: {
    justifyContent: 'center',
    marginLeft: 15
  },
  userImg: {
    width: 75,
    height: 75,
    borderRadius: 5
  },
  userNameLight: {
    fontSize: 17,
    color: COLORS.black,
  },
  userNameDark: {
    fontSize: 17,
    color: COLORS.secondary,
  },
  id: {
    fontSize: 15,
    color: COLORS.secondary
  },
  
})