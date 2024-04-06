import { StyleSheet, Text, View, TouchableOpacity , Dimensions, LayoutAnimation } from 'react-native'
import React from 'react'
import { Audio } from 'expo-av'
import { useSelector, useDispatch } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { updateTrack } from '../redux/audioSlice'
import { COLORS } from '../constants/theme'
import { getDuration } from '../utils/numShortage'

const width = Dimensions.get('window').width
const PostAudioItem = ({isLightTheme, item}) => {
  const dispatch = useDispatch()
  const track = useSelector(state => state.audio)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const initPlay = React.useRef(false)
  const artist = item.audio.artist
  const title = item.audio.title

  React.useEffect(() => {
    const handler = async () => {
      if (track.info && track.info.id === item.audio.id && track.info.owner_id === item.audio.owner_id) {
        if (initPlay.current) {
          if (track.prev) {
            await track.prev.pauseAsync()
            await track.prev.unloadAsync()
          }
          initPlay.current = false
          await track.sound.loadAsync({uri: track.info.url})
        }
        // if (isPlaying) {
        //   await track.sound.pauseAsync()
        //   setIsPlaying(false)
        // } else {
        await track.sound.playAsync()
        setIsPlaying(true)
        // }
      } else if (track.prev && track.prevInfo.id === item.audio.id && track.prevInfo.owner_id === item.audio.owner_id) {
        // await track.prev.pauseAsync()
        // await track.prev.unloadAsync() 
        setIsPlaying(false)

        // if (isPlaying) {
        //   await track.sound.pauseAsync()
        //   setIsPlaying(false)
        // } else {
        //   await track.sound.playAsync()
        //   setIsPlaying(true)
        // }
      }
    }
    handler()
  }, [track])
  
  
  const stopAudio = async () => {

  }

  const playAudio = async () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    // setIsPlaying(!isPlaying)
    // const sound = new Audio.Sound()
    // await sound.loadAsync({
    //   uri : item.audio.url
    // })
    // await sound.playAsync()
  }

  const onPressTrack = async () => {
    if (isPlaying) {
      if (track.info && track.info.id === item.audio.id && track.info.owner_id === item.audio.owner_id) {
        await track.sound.pauseAsync()
        setIsPlaying(false)
      } else {
        const sound = new Audio.Sound()
        initPlay.current = true
        // await sound.loadAsync({
        //   uri : item.audio.url
        // })
        dispatch(updateTrack({sound: sound, info: item.audio}))
      }
    } else {
      if (track.info && track.info.id === item.audio.id && track.info.owner_id === item.audio.owner_id) {
        await track.sound.playAsync()
        setIsPlaying(true)
      } else {
        const sound = new Audio.Sound()
        initPlay.current = true
        // await sound.loadAsync({
        //   uri : item.audio.url
        // })
        dispatch(updateTrack({sound: sound, info: item.audio}))
      }
    }
  }

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 5, marginBottom: 5}}
      onPress={onPressTrack}
    >
      <View style={{width: 40, height: 40, borderRadius: 50, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center'}}>
        {
          isPlaying ?
          <Ionicons name='pause' color={COLORS.white} size={30}/> :
          <Entypo name='triangle-right' color={COLORS.white} size={30}/>
        }
      </View>
      <View style={{width: width - 150}}>
        <Text numberOfLines={1} style={{fontSize: 15, color: COLORS.primary_light, fontWeight: 'bold'}}>{artist}</Text>
        <Text numberOfLines={1} style={[{fontSize: 15}, isLightTheme ? {color: COLORS.secondary} : {color: COLORS.primary_text}]}>{title}</Text>
      </View>            
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
        <Text style={[{fontSize: 13}, isLightTheme ? {color: COLORS.secondary} : {color: COLORS.primary_text}]}>{getDuration(item.audio.duration)}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PostAudioItem

const styles = StyleSheet.create({})