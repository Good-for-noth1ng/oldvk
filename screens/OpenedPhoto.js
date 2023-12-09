import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Image } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import uuid from 'react-native-uuid'
import CustomHeader from '../components/CustomHeader'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DividerWithLine from '../components/DividerWithLine'
import VideoHeader from '../components/VideoHeader'
import PhotoHeader from '../components/PhotoHeader'
import Comment from '../components/Comment'
import { COLORS } from '../constants/theme'

const OpenedPhoto = ({ navigation, route }) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const accessToken = useSelector(state => state.user.accessToken)
  const { ownerId, photoUrl, date, author, width, height, text, photoId, userId } = route.params
  console.log(photoId)
  const [isLoading, setIsLoading] = React.useState(false)
  const [comments, setComments] = React.useState([])
  const count = 20
  const offset = React.useRef(0)
  const currentLevelCommentsCount = React.useRef()

  const fetchComments = async () => {
    const url = `https://api.vk.com/method/photos.getComments?access_token=${accessToken}&v=5.131&photo_id=${photoId}&need_likes=1&owner_id=${ownerId}&count=${count}&sort=asc&offset=${offset.current}&fields=photo_100&extended=1`
    const res = await fetch(url)
    const commentsData = await res.json()
    console.log(commentsData)
    const items = commentsData.response.items.map(item => {
      const key = uuid.v4()
      let threadItems = []
      if (item?.thread?.count > 0) {
        threadItems = item.thread.items.map(item => {
          const key = uuid.v4()
          let author = commentsData.response.profiles.find(profile => profile.id === item.from_id)
          if (author === undefined) {
            author = commentsData.response.groups.find(group => group.id === (-1 * item.from_id))
          }
          return {
            ...item,
            key,
            author,
          }
        })
      }
      const thread = {
        ...item.thread,
        items: threadItems
      }
      let author = commentsData.response.profiles.find(profile => profile.id === item.from_id)
      if (author === undefined) {
        author = commentsData.response.groups.find(group => group.id === (-1 * item.from_id))
      }
      return {
        ...item, 
        key,
        author,
        thread,
      }
    })
    // setPost(findPostAuthor(parsedPostResponse.response.items[0], parsedPostResponse.response.profiles, parsedPostResponse.response.groups))
    if (commentsData.response.items.length > 0) {
      setComments(items)
    } else {
      setComments(null)
    }
    currentLevelCommentsCount.current = commentsData.response.count
    offset.current += 10
  }

  React.useEffect(() => {
    fetchComments()
  }, [])
  
  const listHeader = () => {
    return (
      <>
        <DividerWithLine dividerHeight={10} dividerColor={isLightTheme ? COLORS.light_smoke : COLORS.background_dark}/>
        <DividerWithLine dividerHeight={3} borderTL={5} borderTR={5} dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}/>
        <PhotoHeader 
          ownerId={ownerId}
          date={date}
          accessToken={accessToken}
          isLightTheme={isLightTheme}
          navigation={navigation}
          name={author.name ? author.name : `${author.first_name} ${author.last_name}`}
          imgUrl={author.photo_100}
          isFriend={false}
          isMember={false}
        />
        <View style={[{paddingLeft: 5, paddingRight: 5}, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
          <Image source={{uri: photoUrl}} style={{width: width, height: height, maxWidth: '100%',}}/>
        </View>
        {
          text ?
          <>
            <View style={[{padding: 5}, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>{text}</Text>
            </View>
          </> : 
          null
        }
        {
          text && currentLevelCommentsCount.current ?
          <DividerWithLine 
              dividerLineHeight={1} 
              dividerLineWidth={'93%'} 
              dividerLineColor={COLORS.light_smoke} 
              dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}
          /> :
          null
        }
        {
          currentLevelCommentsCount.current >= 0 ?
          <>
            <View style={[{flexDirection: 'row', padding: 5, gap: 5}, isLightTheme? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
              <Text style={styles.commentCount}>{currentLevelCommentsCount.current}</Text>
              <Text style={styles.commentCount}>{currentLevelCommentsCount.current !== 1 ? 'COMMENTS' : 'COMMENT'}</Text>
            </View>
          </> : null
        }
      </>
    )
  }
  const renderItem = ({item}) => {
    console.log(item)
    return (
      <Comment 
        commentId={item.id}
        commentDate={item.date} 
        likes={item?.likes?.count} 
        from_id={item.from_id} 
        commentText={item.text}
        threadComments={[]}
        threadCount={item.thread.count}
        navigation={navigation}
        // postId={postId}
        ownerId={ownerId}
        attachments={item?.attachments}
        is_deleted={item.deleted}
        isLightTheme={isLightTheme}
        // openCommentMenu={openCommentMenu}
        author={item.author}
      />
    )
  }
  const footer = () => {
    return (
      <>
        <DividerWithLine dividerHeight={10} borderBL={5} borderBR={5} dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}/>
        <DividerWithLine dividerHeight={10} dividerColor={isLightTheme ? COLORS.light_smoke : COLORS.background_dark}/>
      </>
      
    )
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
      <FlatList
        data={comments}
        style={[styles.list]}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={footer}
        ListEmptyComponent={
          comments !== null &&
          <View style={[{paddingTop: 10}, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
            <ActivityIndicator size={40} color={isLightTheme ? COLORS.primary : COLORS.white}/>
          </View>
        }
      />
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
    flex: 1,
    marginLeft: 5, 
    marginRight: 5, 
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    borderRadius: 5
  },
  list: {
    marginLeft: 5,
    marginRight: 5,
  },
  commentCount: {
    fontSize: 15,
    color: COLORS.secondary,
  }
})