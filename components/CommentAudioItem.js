import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Modal, Dimensions, ToastAndroid } from 'react-native'
import React from 'react'
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import { useSelector, useDispatch } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { updateTrack } from '../redux/audioSlice'
import { COLORS } from '../constants/theme'
import { getDuration, getSongCurStatus } from '../utils/numShortage';

const screenWidth = Dimensions.get('window').width
const CommentAudioItem = ({ item, isLightTheme, audios }) => {
  const dispatch = useDispatch()
  const track = useSelector(state => state.audio)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isAvailable, setIsAvailable] = React.useState(true)
  const [played, setPlayed] = React.useState(0)
  const title = item.audio.title
  const artist = item.audio.artist
  
  React.useEffect(() => {
    const handler = async () => {
      if (track.info && track.info.id === item.audio.id && track.info.owner_id === item.audio.owner_id) {
        if (isAvailable === false) {
          if (item.audioIndex+1 + 1 < audios.length) {
            const sound = new Audio.Sound()
            dispatch(updateTrack({sound: sound, info: audios[item.audioIndex+1].audio}))
          } else {
            dispatch(updateTrack({sound: null, info: null}))
          }
          setIsPlaying(false)
          setIsAvailable(false)
          return
        }
        if (track.prev) {
          try {
            await track.prev.pauseAsync()
            await track.prev.unloadAsync()
          } catch (e) {
            await track.sound.loadAsync({uri: track.info.url})
          }
        }
        try {
          await track.sound.loadAsync({uri: track.info.url})
        } catch (error) {
          if (error.message === 'yb.a0$f: Response code: 404') {
            ToastAndroid.show(`${artist} - ${title} is not available`, ToastAndroid.SHORT)
            await track.sound.unloadAsync()
            if (item.audioIndex+1 < audios.length) {
              const sound = new Audio.Sound()
              dispatch(updateTrack({sound: sound, info: audios[item.audioIndex+1].audio}))
            } else {
              dispatch(updateTrack({sound: null, info: null}))
            }
            setIsPlaying(false)
            setIsAvailable(false)
          }
        }
        track.sound.setOnPlaybackStatusUpdate(onPlaybackUpdate)
        await track.sound.playAsync()
        setIsPlaying(true)
      } else if (track.prev && track.prevInfo.id === item.audio.id && track.prevInfo.owner_id === item.audio.owner_id) { 
        setIsPlaying(false)
      }
    }
    handler()
  }, [track])

  const onPlaybackUpdate = async (status) => {
    setPlayed(status.positionMillis)
    if (status.didJustFinish) {
      if (item.audioIndex + 1 < audios.length) {
        const sound = new Audio.Sound()
        dispatch(updateTrack({sound: sound, info: audios[item.audioIndex+1].audio}))
      } else {
        await track.sound.pauseAsync()
        dispatch(updateTrack({sound: null, info: null}))
        setIsPlaying(false)
      }
    }
  }

  const onPressTrack = async () => {
    if (isPlaying) {
      if (track.info && track.info.id === item.audio.id && track.info.owner_id === item.audio.owner_id) {
        await track.sound.pauseAsync()
        setIsPlaying(false)
      } else {
        const sound = new Audio.Sound()
        dispatch(updateTrack({sound: sound, info: item.audio}))
      }
    } else {
      if (track.info && track.info.id === item.audio.id && track.info.owner_id === item.audio.owner_id) {
        await track.sound.playAsync()
        setIsPlaying(true)
      } else {
        const sound = new Audio.Sound()
        dispatch(updateTrack({sound: sound, info: item.audio}))
      }
    }
  }

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 5, marginBottom: 5}}
      onPress={isAvailable ? onPressTrack : () => {}}
    >
      <View style={{width: 40, height: 40, borderRadius: 50, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center'}}>
        {
          isPlaying ?
          <Ionicons name='pause' color={COLORS.white} size={30}/> :
          <Entypo name='triangle-right' color={COLORS.white} size={30}/>
        }
      </View>
      <View style={{width: screenWidth - 250}}>
        <Text numberOfLines={1} style={{fontSize: 15, color: COLORS.primary_light, fontWeight: 'bold'}}>{artist}</Text>
        <Text numberOfLines={1} style={[{fontSize: 15}, isLightTheme ? {color: COLORS.secondary} : {color: COLORS.primary_text}]}>{title}</Text>
      </View>            
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
        <Text style={[{fontSize: 13}, isLightTheme ? {color: COLORS.secondary} : {color: COLORS.primary_text}]}>
          {
            track.info && track.info.id === item.audio.id && track.info.owner_id === item.audio.owner_id ?
            getSongCurStatus(0, played) :
            getDuration(item.audio.duration)
          }
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default CommentAudioItem

const styles = StyleSheet.create({})