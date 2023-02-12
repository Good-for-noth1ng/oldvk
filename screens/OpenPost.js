import { StyleSheet, FlatList, View, ActivityIndicator, Text, Modal, StatusBar, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useCallback, memo } from 'react'
import Post from '../components/Post'
import { useSelector, useDispatch } from 'react-redux'
import uuid from 'react-native-uuid'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../constants/theme'
import Comment from '../components/Comment'
import { setProfiles, closeAuthorInfo } from '../redux/commentsSlice'
import OpenedPostBottom from '../components/OpenedPostBottom'
import DividerWithLine from '../components/DividerWithLine'
import { getTimeDate } from '../utils/date'
import CustomHeader from '../components/CustomHeader'
import Repost from '../components/Repost'

const OpenPost = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()
  const data = useSelector(state => state.news.openedPost) 
  const accessToken = useSelector(state => state.user.accessToken);
  let isAuthorInfoOpen = useSelector(state => state.comments.isAuthorInfoOpen);
  const authorName = useSelector(state => state.comments.authorName)
  const authorImgUrl = useSelector(state => state.comments.authorImgUrl)
  const regestrationDate = useSelector(state => state.comments.registrationDate)
  const registrationDateIsFetching = useSelector(state => state.comments.authorInfoIsFetching)
  const [comments, setComments] = useState(null);
  
  
  const commentsUrl = `https://api.vk.com/method/wall.getComments?access_token=${accessToken}&v=5.131&need_likes=1&owner_id=${data.source_id}&post_id=${data.post_id}&sort=asc&thread_items_count=2`;
  console.log(data.source_id, data.post_id)

  const fetchComments = useCallback(async () => {
    fetch(commentsUrl)
      .then(response => response.json())
      .then(data => {
          let profilesUrlParam = '';
          const items = data.response.items.map(item => {
            profilesUrlParam += `${item.from_id},`
            return {...item, key: uuid.v4()}
          });
          setComments(items);
          const commentAuthorUrl = `https://api.vk.com/method/users.get?access_token=${accessToken}&v=5.131&user_ids=${profilesUrlParam}&fields=photo_100`;
          fetch(commentAuthorUrl)
            .then(response => response.json())
            .then(data => {
              dispatch(setProfiles(data.response));
              setIsLoading(false);
            });
      })
  }, [commentsUrl])
  // console.log(authorName)
  useEffect(() => { 
    fetchComments();
  }, []);

  
  const renderComment = ({item}) => (
    <Comment data={item} />
  )

  const commentSeparator = () => (
    <View style={{height: 12, marginLeft: 5, marginRight: 5, backgroundColor: COLORS.white}}></View>
  )

  const handleNavigationBack = () => {
    navigation.pop()
  }

  const listHeader = () => {
    // console.log(data)
    // console.log(data.likes)
    if (data.copy_history === undefined) {
    return (
      <>
        <Post data={data} navigation={navigation} openedPost={false}/>
        <OpenedPostBottom 
          likes={data?.likes?.count} 
          reposts={data?.reposts?.count} 
          views={data?.views?.count} 
          comments={data?.comments?.count}
        />
      </>
    )
    }
    return (
      <>
        <Repost data={data} openedPost={false}/>
        <OpenedPostBottom 
          likes={data?.likes?.count} 
          reposts={data?.reposts?.count} 
          views={data?.views?.count} 
          comments={data?.comments?.count}
        />
      </>
    )
  }

  const listFooter = () => {
    return <DividerWithLine dividerColor={COLORS.white} dividerHeight={10} marginL={5} marginR={5} marginB={125}/>
  }

  const handleClosingCommentAuthorInfo = () => {
    dispatch(closeAuthorInfo());
  }

  return (
    <View>
      <SafeAreaView>
      <StatusBar barStyle={COLORS.white} backgroundColor={COLORS.primary}/>
      <CustomHeader 
        headerName={<Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Post</Text>}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        iconTouchHandler={handleNavigationBack}
      />
      {
        isLoading ? 
        <View style={styles.activityContainer}>
          <ActivityIndicator size={50} color={COLORS.primary}/>
        </View> :
        <>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Modal  
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} 
              animationType='slide' 
              transparent={true} 
              visible={isAuthorInfoOpen} 
              onRequestClose={() => {dispatch(closeAuthorInfo())}}
            >
              <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.modalView}>
                  {
                    registrationDateIsFetching ? 
                      <View style={styles.activityContainer}>
                        <ActivityIndicator size={50} color={COLORS.primary}/>
                      </View> :
                      <>
                      <View style={styles.commentInfoHeader}>
                      <TouchableOpacity style={styles.crossButton} activeOpacity={1} onPress={handleClosingCommentAuthorInfo}>
                        <AntDesign name='close' size={20} color={COLORS.primary}/>
                      </TouchableOpacity>
                      </View>
                      <View style={styles.nameAvatarContainer}>
                      <Image style={styles.avatarInfo} source={{uri: authorImgUrl}}/>
                      <Text style={styles.nameInfo}>{authorName}</Text>
                      </View>
                      <View style={styles.registredContainer}>
                      <Text style={styles.registredText}>Registred: {getTimeDate(regestrationDate)}</Text>
                      </View>
                    </>
                  }  
                </View>
              </View>
            </Modal>
          </View>
          <FlatList 
            ListHeaderComponent={listHeader}
            data={comments}
            renderItem={renderComment}      
            ItemSeparatorComponent={commentSeparator}
            ListFooterComponent={listFooter}
          />
        </>
      }
      </SafeAreaView>
    </View>
  )
}

export default memo(OpenPost)

const styles = StyleSheet.create({
  activityContainer: {
    width: '100%', 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  activityContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 250, 
    height: 250, 
    backgroundColor: COLORS.white, 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    shadowColor: COLORS.black,
    borderRadius: 10,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    elevation: 13,
    shadowRadius: 4,
  },
  commentInfoHeader: {
    width: '100%', 
    height: 40, 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    alignItems: 'center',
  },
  crossButton: {
    width: 30, 
    height: 30,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameAvatarContainer: {
    width: 230,
    display: 'flex',
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInfo: {
    width: 50, 
    height: 50, 
    borderRadius: 100, 
    marginRight: 5,
  },
  nameInfo: {
    fontSize: 16, 
    fontWeight: '700', 
    color: COLORS.black, 
    marginLeft: 5,
  },
  registredContainer: {
    marginTop: 40
  },
  registredText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black
  }
})