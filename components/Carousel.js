import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FlatList } from "react-native-gesture-handler";
import CarouselItem from './CarouselItem'
import DividerWithLine from '../components/DividerWithLine'
import SearchResultHeaderCounter from '../components/SearchResultHeaderCounter';
import { COLORS } from '../constants/theme';

const Carousel = ({navigation, data, dataLength, type, isLightTheme}) => {
  
  const renderItem = ({item}) => {
    return (
      <CarouselItem 
        cover={item.sizes[item.sizes.length - 1].url}
        title={item.title}
        type={type}
        num={item.size}
        isLightTheme={isLightTheme}
      />
    )
  }

  const separator = () => {
    return (
      <DividerWithLine dividerWidth={10} dividerHeight={'100%'} dividerColor={isLightTheme ? COLORS.white : COLORS.primary_dark}/>
    )
  }

  if (data === undefined) {
    return null
  }
  return (
    <>
      <SearchResultHeaderCounter isLightTheme={isLightTheme} counterNum={dataLength} counterName={'Albums'}/>
      <View style={[{padding: 8}, isLightTheme ? {backgroundColor: COLORS.white} : {backgroundColor: COLORS.primary_dark}]}>
      
      <FlatList 
        data={data}
        renderItem={renderItem}
        horizontal={true}
        ItemSeparatorComponent={separator}
        showsHorizontalScrollIndicator={false}
      />
    </View>
    </>
  )
}

export default Carousel

const styles = StyleSheet.create({})