import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, memo } from 'react'
import { COLORS } from '../constants/theme'
import { useSelector, useDispatch } from 'react-redux'
import BottomPost from './BottomPost'
import PostHeader from './PostHeader'
import PostText from './PostText'
import PostPhotos from './PostPhotos'
import PostFiles from './PostFiles'
import PostLinks from './PostLinks'
import PostVideos from './PostVideos'
import PostDivider from './PostDivider'
import { setOpenedPost } from '../redux/newsSlice'


const Post = ({data, navigation, openedPost, dataType}) => {
  const dispatch = useDispatch();

  // const [postVideos, setPostVideos] = useState([]);
  // const [postPhotos, setPostPhotos] = useState([]);
  // const [postDocs, setPostDocs] = useState([]);
  // const [postLinks, setPostLinks] = useState([]);
  // const [attachments, setAttachments] = useState(null);
  // const [type, setType] = useState(data.type);
  let postPhotos = []
  let postDocs = []
  let postLinks = []
  let postVideos = []
  // const type = data.type
  const openPost = useCallback(() => {
    if (openedPost) {
      dispatch(setOpenedPost(data))
      navigation.navigate('OpenPost')
    }
  }, [openedPost])

  const initPostData = () => {
    // console.log(data.key)
    if (data.attachments !== undefined && dataType === 'post') {  
      let attachments
      if (data.copy_history !== undefined) {
        attachments = data.copy_history[0].attachments
      } else {
        attachments = data.attachments
      }
      for (let i = 0; i < attachments.length; i++) {
        if (attachments[i].type === 'photo') {
          postPhotos.push(attachments[i].photo)
        } else if (attachments[i].type === 'doc') {
          postDocs.push(attachments[i].doc)
        } else if(attachments[i].type === 'link') {
          postLinks.push(attachments[i].link)
        } else if (attachments[i].type === 'video') {
          postVideos.push(attachments[i].video)
        }
      }
    }
  }

  initPostData()

  if (dataType === 'wall_photo') {
    return null
  }

  // const [hasText, setHasText] = useState(data.text ? true : false);
  
  // const [hasPhotos, setHasPhotos] = useState(data?.attachments?.photo !== undefined ? true : false);
  // const [hasFiles, setHasFiles] = useState(data?.attachments?.doc !== undefined ? true : false);
  // const [hasLinks, setHasLinks] = useState(data?.attachments?.link !== undefined ? true : false);
  // const hasText = data.text ? true : false
  // const hasPhotos = postPhotos ? true : false
  // const hasFiles = postDocs ? true : false
  // const hasLinks = postLinks ? true : false
  
  const checkIsRepost = () => {
    if (data.copy_history !== undefined) {
      const hasRepostText = data.copy_history[0].text ? true : false
      
      return (
        <View style={styles.postContainer}>
          <PostHeader sourceId={data.source_id} dataDate={data.date} isRepost={false}/>
          <TouchableOpacity activeOpacity={1} onPress={openPost}>
            <PostDivider dividerHeight={12} />
            {
              data.text ? (
                <>
                  <PostText dataText={data.text} toOpen={openedPost}/>
                  <PostDivider dividerHeight={6}/>
                </>
                ) : null 
            }
          </TouchableOpacity>
          <PostHeader sourceId={data.copy_history[0].owner_id} dataDate={data.copy_history[0].date} isRepost={true}/>
          <TouchableOpacity activeOpacity={1} onPress={openPost}>
            <PostDivider dividerHeight={12} />
            {
              hasRepostText ? (
                <>
                  <PostText dataText={data.copy_history[0].text} toOpen={openedPost}/>
                  <PostDivider dividerHeight={6}/>
                </>
              ) : null
            }
          </TouchableOpacity>
          {
            postPhotos ? (
            <>
              <PostPhotos postPhotos={postPhotos}/>
              {/* <PostVideos postVideos={postVideos}/> */}
              <PostDivider dividerHeight={5}/>  
            </>
            ) : null
          }
          {
            postDocs ? (
            <>
              <PostFiles postDocs={postDocs}/>  
            </>
            ) : <PostDivider dividerHeight={5}/>
          }
          { 
            postLinks ? 
            ( 
              <>
                <PostLinks postLinks={postLinks}/>
                <PostDivider dividerHeight={6} />
              </>
            ) 
            : null
          }
          <BottomPost 
            dataComments={data.comments} 
            dataLikes={data.likes} 
            dataReposts={data.reposts}
            openedPost={openedPost}
          />
        </View>  
      )
    }
  }
  
  checkIsRepost();
  // console.log(data.source_id, data.post_id);
  return (
    <View style={styles.postContainer}>
      <PostHeader sourceId={data.source_id} dataDate={data.date}/>
      <TouchableOpacity activeOpacity={1} onPress={openPost}>
        <PostDivider dividerHeight={12}/>
        {
          data.text ? (
            <>
              <PostText dataText={data.text} toOpen={openedPost}/>
              <PostDivider dividerHeight={6}/>
            </>
          ) : null
        }
      </TouchableOpacity>
      { 
        postPhotos.length > 0 ? (
          <>
            <PostPhotos postPhotos={postPhotos}/>
            {/* <PostVideos postVideos={postVideos}/> */}
            <PostDivider dividerHeight={5}/>  
          </>
        ) : null
      }
      {
        postDocs ? (
          <>
            <PostFiles postDocs={postDocs}/>  
          </>
          ) : <PostDivider dividerHeight={5}/>
      }
      {
        postLinks ? ( 
          <>
            <PostLinks postLinks={postLinks}/>
            <PostDivider dividerHeight={6} />
          </>
        ) : null
      }
      <BottomPost dataComments={data.comments} dataLikes={data.likes} dataReposts={data.reposts} openedPost={openedPost}/>
    </View>
  )
}

export default memo(Post)

const styles = StyleSheet.create({
  postContainer: {
    padding: 10,
    marginTop: 5,
    marginRight: 5,
    // marginBottom: 5,
    marginLeft: 5,
    borderRadius: 3,
    backgroundColor: COLORS.white,
  },
  
})