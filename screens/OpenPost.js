import { StyleSheet, FlatList, View, ActivityIndicator, Text, Modal, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Post from '../components/Post'
import { useSelector, useDispatch } from 'react-redux'
import { COLORS } from '../constants/theme'
import Comment from '../components/Comment'
import uuid from 'react-native-uuid'
import { setProfiles, closeAuthorInfo } from '../redux/commentsSlice'
import OpenedPostBottom from '../components/OpenedPostBottom'
import DividerWithLine from '../components/DividerWithLine'


const OpenPost = ({navigation}) => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.news.openedPost) 
  const accessToken = useSelector(state => state.user.accessToken);
  const commentsUrl = `https://api.vk.com/method/wall.getComments?access_token=${accessToken}&v=5.131&need_likes=1&owner_id=${data.source_id}&post_id=${data.post_id}&sort=asc&thread_items_count=2`;
  console.log(data.source_id, data.post_id)
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let isAuthorInfoOpen = useSelector(state => state.comments.isAuthorInfoOpen);
  const [authorName, setAuthorName] = useState(useSelector(state => state.comments.authorName))
  const [authorImgUrl, setAuthorImgUrl] = useState(useSelector(state => state.comments.authorImgUrl))
  // console.log(authorName)
  useEffect(() => {
    const fetchComments = async (commentsUrl) => {
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
    }
    fetchComments(commentsUrl);
  }, []);
  const renderComment = ({item}) => (
    <Comment data={item} />
  )
  const commentSeparator = () => (
    <View style={{height: 12, marginLeft: 5, marginRight: 5, backgroundColor: COLORS.white}}></View>
  )

  const listHeader = () => (
    <>
      <Post data={data} navigation={navigation} openedPost={false}/>
      <OpenedPostBottom 
        likes={data.likes.count} 
        reposts={data.reposts.count} 
        views={data.views.count} 
        comments={data.comments.count}
      />
    </>
  )

  const listFooter = () => (
    <DividerWithLine dividerColor={COLORS.white} dividerHeight={15} marginL={5} marginR={5} marginB={5}/>
  )
  return (
    <View style={isAuthorInfoOpen && {flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {
        isLoading ? 
        <View style={styles.activityContainer}>
          <ActivityIndicator size={50} color={COLORS.primary}/>
        </View> :
        <>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.light_smoke}}>
            <Modal  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} animationType='slide' transparent={true} visible={isAuthorInfoOpen} onRequestClose={() => {dispatch(closeAuthorInfo())}}>
              <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.modalView}>
                  <Image source={{uri: authorImgUrl}}/>
                  <Text>{authorName}</Text>
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
    </View>
    
  )
}

export default OpenPost

const styles = StyleSheet.create({
  activityContainer: {
    width: '100%', 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  modalView: {
    width: 250, 
    height: 250, 
    backgroundColor: COLORS.white, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: COLORS.black,
    borderRadius: 10,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    elevation: 20,
    shadowRadius: 4,
  }

})