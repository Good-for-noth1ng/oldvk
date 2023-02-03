import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Post from '../components/Post'
import { useSelector, useDispatch } from 'react-redux'
import { COLORS } from '../constants/theme'
import Comment from '../components/Comment'
import uuid from 'react-native-uuid'
import { setProfiles } from '../redux/commentsSlice'

const OpenPost = ({navigation}) => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.news.openedPost) 
  const accessToken = useSelector(state => state.user.accessToken);
  const commentsUrl = `https://api.vk.com/method/wall.getComments?access_token=${accessToken}&v=5.131&need_likes=1&owner_id=${data.source_id}&post_id=${data.post_id}&sort=asc&thread_items_count=2`;
  console.log(data.source_id, data.post_id)
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
  return (
    <View>
      {
        isLoading ? 
        <View style={styles.activityContainer}>
          <ActivityIndicator size={50} color={COLORS.primary}/>
        </View> :
        <FlatList 
          ListHeaderComponent={<Post data={data} navigation={navigation} openedPost={false}/>}
          data={comments}
          renderItem={renderComment}      
          ItemSeparatorComponent={commentSeparator}
        />
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
  }
})