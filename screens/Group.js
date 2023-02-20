import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { COLORS } from '../constants/theme'
import CustomHeader from '../components/CustomHeader'
import AntDesign from 'react-native-vector-icons/AntDesign'
import uuid from 'react-native-uuid';
import Post from '../components/Post'
import { setData } from '../redux/groupSlice'

const Group = ({navigation}) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.user.accessToken)
  const groupID = useSelector(state => state.group.id) 
  const offset = useSelector(state => state.group.offset) 
  // console.log(groupID)
  const fetchGroupWallContent = `https://api.vk.com/method/wall.get?access_token=${accessToken}&count=20&v=5.131&extended=1&owner_id=${groupID}`
  const [isLoading, setIsLoading] = useState(false)
  const postData = useSelector(state => state.group.items) 
  // const [postData, setPostData] = useState(null)
  const goBack = () => {
    navigation.goBack()
  }
  useEffect(() => {
    setIsLoading(true)
    fetch(fetchGroupWallContent)
    .then(response => response.json())
    .then(data => {
      data.response.items.forEach(item => {
        item = {...item, key: uuid.v4()}
      })
      dispatch(setData(data.response))
      // setPostData(data.response.items)
      setIsLoading(false)
    })
  }, [])
  const keyExtractor = (item) => {
    return item.key
  }
  const renderItem = ({item}) => {
    return <Post data={item} navigation={navigation} openedPost={true} isCommunityContent={true}/>
  }
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.primary} barStyle={COLORS.white}/>
      <CustomHeader 
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
        headerName={<Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Community</Text>}
      />
      {
        isLoading ?
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={COLORS.primary} size={50}/>
        </View> : 
        <FlatList 
          data={postData}
          renderItem={renderItem}
          initialNumToRender={4}
          keyExtractor={keyExtractor}
          removeClippedSubviews={true}
        />
      }
    </SafeAreaView>
  )
}

export default Group

const styles = StyleSheet.create({
  spinnerContainer: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  feed: {
    backgroundColor: COLORS.light_smoke
  },
})