import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { FlatList } from "react-native-gesture-handler";
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomHeader from '../components/CustomHeader'
import UserListItem from '../components/UserListItem'
import DividerWithLine from '../components/DividerWithLine'
import { COLORS } from '../constants/theme'

const ReactedOnPostUsers = ({ navigation, route }) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const [isLoading, setIsLoading] = React.useState(true)
  const [usersList, setUsersList] = React.useState([])
  const count = 10
  const offset = React.useRef(0)
  const remainToFetchNum = React.useRef(null)
  const { ownerId, postId } = route.params 

  const fetchUsersWhoReacted = async () => {
    const likesListUrl = `https://api.vk.com/method/likes.getList?access_token=${accessToken}&v=5.131&type=post&count=${count}&offset=${offset.current}&owner_id=${ownerId}&item_id=${postId}`
    const likesListResponse = await fetch(likesListUrl)
    const likesListData = await likesListResponse.json()
    if (remainToFetchNum.current === null) {
      remainToFetchNum.current = likesListData.response.count - count
    } else {
      remainToFetchNum.current -= count 
    }
    offset.current += count
    const fetchUsersUrl = `https://api.vk.com/method/users.get?access_token=${accessToken}&v=5.131&fields=photo_100&user_ids=${likesListData.response.items}`
    const response = await fetch(fetchUsersUrl)
    const data = await response.json()
    // console.log(data.response)
    setUsersList(prevState => prevState.concat(data.response))
    setIsLoading(false)
  }

  const fetchMoreUsersWhoReacted = () => {
    fetchUsersWhoReacted()
  }

  React.useEffect(() => {
    fetchUsersWhoReacted()
  }, [])

  const renderItem = ({item}) => {
    return (
      <UserListItem 
        imgUrl={item.photo_100}
        firstName={item.first_name}
        lastName={item.last_name}
        id={item.id}
        navigation={navigation}
        isLightTheme={isLightTheme}
        bdate={undefined}
        city={undefined}
      />
    )
  }

  const listSeparator = () => (
    <DividerWithLine dividerHeight={10} dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}/>
  )
  
  const listHeader = () => {
    return (
      <DividerWithLine 
        dividerHeight={10} 
        marginT={10} 
        borderTL={5} 
        borderTR={5} 
        dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
      />  
    )
  }

  const footer = () => {
    if (remainToFetchNum.current > 0) {
      return (
        <>
          <View style={[{justifyContent: 'center'}, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColorL: COLORS.primary_dark}]}>
            <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={40}/>
          </View>
          <DividerWithLine 
            dividerHeight={5} 
            marginB={10} 
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

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={[{flex: 1}, isLightTheme ? {backgroundColor: COLORS.light_smoke} : {backgroundColor: COLORS.background_dark}]}>
      <CustomHeader 
        isLightTheme={isLightTheme}
        headerName={<Text style={styles.headerTextStyle}>Reactions</Text>}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
      />
      {
        isLoading ? 
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={isLightTheme ? COLORS.primary : COLORS.white} size={50} />
        </View> :
         usersList.length > 0 ?
          <FlatList
            style={styles.list}
            data={usersList}
            renderItem={renderItem}
            ItemSeparatorComponent={listSeparator}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={listHeader}
            ListFooterComponent={footer}
            onEndReached={fetchMoreUsersWhoReacted}
          />
          : 
          <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: COLORS.secondary, fontSize: 17, fontWeight: 'bold',}}>No reactions</Text>
          </View>
      }
    </SafeAreaView>
  )
}

export default ReactedOnPostUsers

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
  list: {
    marginLeft: 5,
    marginRight: 5,
  },
})