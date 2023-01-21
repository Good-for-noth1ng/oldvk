import { StyleSheet, FlatList, View } from 'react-native'
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
  const commentsUrl = `https://api.vk.com/method/wall.getComments?access_token=${accessToken}&v=5.131&owner_id=${data.source_id}&post_id=${data.post_id}&sort=asc&thread_items_count=2`;
  console.log(data.source_id, data.post_id)
  const [comments, setComments] = useState(null);
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
            const commentAuthorUrl = `https://api.vk.com/method/user.get?access_token=${accessToken}&v=5.131&user_ids=${profilesUrlParam}&fields=photo_100`;
            fetch(commentAuthorUrl)
              .then(response => response.json())
              .then(data => dispatch(setProfiles(data.response)));
        })
    }
    fetchComments(commentsUrl);
  }, []);
  const renderComment = ({item}) => (
    <Comment data={item} profiles={commentsAuthors}/>
  )
  return (
    <FlatList 
      ListHeaderComponent={<Post data={data} navigation={navigation} openedPost={false}/>}
      data={comments}
      renderItem={renderComment}      
    />
  )
}

export default OpenPost

const styles = StyleSheet.create({})