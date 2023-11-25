import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Image } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import CustomHeader from '../components/CustomHeader'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DividerWithLine from '../components/DividerWithLine'
import VideoHeader from '../components/VideoHeader'
import PhotoHeader from '../components/PhotoHeader'
import { COLORS } from '../constants/theme'

const OpenedPhoto = ({ navigation, route }) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const { ownerId, photoUrl, date, author, width, height } = route.params
  // console.log(width, height)
  const [isLoading, setIsLoading] = React.useState(false)

  const fetchComments = async () => {

  }

  React.useEffect(() => {

  }, [])
  
  const listHeader = () => {
    return (
      <>
        <PhotoHeader 
          ownerId={ownerId}
          date={date}
          accessToken={accessToken}
          isLightTheme={isLightTheme}
          navigation={navigation}
          name={author.name}
          imgUrl={author.photo_100}
          isFriend={false}
          isMember={false}
        />
        <Image source={{uri: photoUrl}} style={{width: width, height: height, maxWidth: '100%'}}/>
      </>
    )
  }
  const renderItem = () => {
    return null
  }
  const goBack = () => {
    navigation.goBack()
  }
  return (
    <SafeAreaView style={[{flex: 1, justifyContent: 'flex-start' }, isLightTheme ? {backgroundColor: COLORS.light_smoke} : {backgroundColor: COLORS.background_dark}]}>
      <CustomHeader 
        isLightTheme={isLightTheme}
        headerName={<Text style={styles.headerTextStyle}>Photo</Text>}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
      />
      <View 
        style={[
          styles.contentContainer, 
          isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}
        ]}
      >
        {
          isLoading ?
          <View style={{width: '100%', height: '100%', justifyContent: 'center'}}>
            <ActivityIndicator size={50} color={isLightTheme ? COLORS.primary : COLORS.white}/>
          </View> :
          <FlatList
            data={[]}
            renderItem={renderItem}
            ListHeaderComponent={listHeader}
          />
        }
      </View>
    </SafeAreaView>
  )
}

export default OpenedPhoto

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  contentContainer: {
    // flex: 1,
    marginLeft: 5, 
    marginRight: 5, 
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    borderRadius: 5
  },
})