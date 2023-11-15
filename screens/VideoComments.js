import { StyleSheet, Text, View, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native'
import React from 'react'
import { FlatList } from "react-native-gesture-handler";
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomHeader from '../components/CustomHeader'
import VideosListItem from '../components/VideosListItem'
import DividerWithLine from '../components/DividerWithLine'
import { setProfiles, closeAuthorInfo, pushProfiles, setGroups, pushGroups } from '../redux/commentsSlice'
import Comment from '../components/Comment';
import { COLORS } from '../constants/theme'

const VideoComments = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [comments, setComments] = React.useState([])
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const count = 10
  const offset = React.useRef(0)
  const remainToFetchNum = React.useRef(null)
  const {ownerId, videoId} = route.params
  
  const fetchComments = async () => {
    const url = `https://api.vk.com/method/video.getComments?access_token=${accessToken}&v=5.131&video_id=${videoId}&need_likes=1&owner_id=${ownerId}&count=${count}&sort=asc&offset=${offset.current}&fields=photo_100&extended=1`
    const response = await fetch(url)
    const data = await response.json()
    if (remainToFetchNum.current === null) {
      // console.log(data)
      remainToFetchNum.current = data.response.count - count
    } else {
      remainToFetchNum.current -= count
    }
    offset.current += count
    const preparedComments = data.response.items.map(item => {
      const key = uuid.v4()
      let author = data.response.profiles.find(profile => profile.id === item.from_id)
      if (author === undefined) {
        author = data.response.groups.find(group => group.id === (-1 * item.from_id))
      }
      return {
        ...item, 
        key,
        author,
      }
    })
    // console.log(preparedComments)
    setComments(prevState => prevState.concat(preparedComments))
    setIsLoading(false)
  }
  
  const fetchMore = () => {
    if (remainToFetchNum.current > 0) {
      fetchComments()
    }
  }

  React.useEffect(() => {
    fetchComments()
  }, [])

  const listHeader = () => {
    return (
      <DividerWithLine 
        dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
        dividerHeight={5}
        borderTL={5}
        borderTR={5}
        marginT={5}
      />
    )
  }
  const renderItem = ({item}) => {
    return (
      <Comment 
        commentId={item.id}
        commentDate={item.date} 
        likes={item?.likes?.count} 
        from_id={item.from_id} 
        commentText={item.text}
        threadComments={[]}
        navigation={navigation}
      // postId={item.post_id}
        ownerId={item.owner_id}
        attachments={item?.attachments}
        is_deleted={item.deleted}
        isLightTheme={isLightTheme}
       // openCommentMenu={openCommentMenu}
        author={item.author}
      />
    )
  }

  const listSeparator = () => {
    return (
      <DividerWithLine dividerHeight={10} dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}/>
    )
  }

  const footer = () => {
    if (remainToFetchNum.current > 0) {
      return (
        <>
          <View style={[{justifyContent: 'center'}, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
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
    <SafeAreaView 
        style={[{flex: 1}, isLightTheme ? {backgroundColor: COLORS.light_smoke} : {backgroundColor: COLORS.background_dark}]}>
      <StatusBar barStyle={COLORS.white} backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark}/>
      <CustomHeader 
        isLightTheme={isLightTheme}
        headerName={<Text style={styles.headerTextStyle}>Comments</Text>}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={goBack}
      />
      {
        isLoading ?
        <View style={styles.activityContainer}>
          <ActivityIndicator size={50} color={isLightTheme ? COLORS.primary : COLORS.white}/>
        </View> :
        <FlatList 
          data={comments}
          renderItem={renderItem}
          ListHeaderComponent={listHeader}
          style={[
            {marginLeft: 5, marginRight: 5}, 
            // isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}
          ]}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={footer}
          onEndReached={fetchMore}
          ItemSeparatorComponent={listSeparator}
        />
      }
    </SafeAreaView>
  )
}

export default VideoComments

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  activityContainer: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})