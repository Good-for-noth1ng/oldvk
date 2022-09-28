import { View, Text, SafeAreaView, StatusBar, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchInitNews } from '../redux/newsSlice';
import { COLORS } from '../constants/theme';
import { Bubbles } from 'react-native-loader';

const News = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  dispatch(fetchInitNews());
    
  return (
    <View>
      <SafeAreaView>
        <StatusBar backgroundColor={COLORS.primary} />
        {loading ? 
          <View style={styles.spinnerContainer}>
            <ActivityIndicator color={COLORS.primary} size={50}/>
          </View> : 
          <View>
            <Text>
              done
            </Text>
          </View>
        }
      </SafeAreaView>
    </View>
  )
}
const styles = StyleSheet.create({
  spinnerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  }
})
export default News