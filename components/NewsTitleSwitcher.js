import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import {Dropdown} from 'react-native-element-dropdown'
import { COLORS } from '../constants/theme';
import { setCurrentPage } from '../redux/newsSlice';
import { useSelector, useDispatch } from 'react-redux';

const NewsTitleSwitcher = () => {
    const dispatch = useDispatch()
    const currentPage = useSelector(state => state.news.currentPage)
    const newsOptions = [
      {label: 'News', value: 'News'},
      {label: 'Recommended', value: 'Recommended'}
    ]      
    return (
    <Dropdown 
      value={currentPage}
      style={currentPage === 'News' ? styles.dropdownNews : styles.dropdownRecommended}
      containerStyle={styles.list}
      selectedTextStyle={styles.selectedTextStyle}
      iconColor={COLORS.white}
      activeColor={COLORS.light_smoke}
      data={newsOptions}
      maxHeight={300}
      valueField='value'
      labelField='label'
      placeholder='Select news'
      onChange={item => {
        dispatch(setCurrentPage(item.value))
      }}
    />
  )
}

export default NewsTitleSwitcher

const styles = StyleSheet.create({
  dropdownNews: {
    margin: 16,
    height: 50,
    width: 80,
    color: COLORS.white
  },
  dropdownRecommended: {
    margin: 16,
    height: 50,
    width: 150,
    color: COLORS.white
  },
  list: {
    width: 150
  },
  icon: {
    marginRight: 5,
  },
  selectedTextStyle: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
})