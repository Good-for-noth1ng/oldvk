import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomHeader from '../components/CustomHeader'
import OptionsListSwitcherItem from '../components/OptionsListSwitcherItem'
import DividerWithLine from '../components/DividerWithLine';
import { COLORS } from '../constants/theme'


const Privacy = ({navigation}) => {
  const isLightTheme = useSelector(state => state.colorScheme.isCurrentSchemeLight)
  const listItemsData = useSelector(state => state.options.privacy.items)
  
  const goBack = () => {
    navigation.pop()
  }

  const renderItem = ({item}) => {
    if (item.type === 'switcher') {
      return (
        <OptionsListSwitcherItem 
          name={item.name}
          iconName={item.iconName}
          value={item.value}
          isLightTheme={isLightTheme}
        />
      )
    }
  }

  const keyExtractor = (item) => {
    return item.key
  }

  return (
    <SafeAreaView style={isLightTheme ? styles.mainContainerLight : styles.manContainerDark}>
      <StatusBar backgroundColor={isLightTheme ? COLORS.primary : COLORS.primary_dark}/>
      <CustomHeader
        isLightTheme={isLightTheme}
        iconComponent={<AntDesign name='arrowleft' size={30} color={COLORS.white}/>}
        headerName={<Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Privacy</Text>}
        iconTouchHandler={goBack}
      />
      <FlatList
        data={listItemsData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        style={isLightTheme ? styles.listLight : styles.listDark}
      />
    </SafeAreaView>
  )
}

export default Privacy

const styles = StyleSheet.create({
  mainContainerLight: {
    flex: 1,
    backgroundColor: COLORS.light_smoke
  },
  manContainerDark: {
    flex: 1,
    backgroundColor: COLORS.background_dark
  },
  listLight: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    paddingTop: 5,
    backgroundColor: COLORS.white
  },
  listDark: {
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: COLORS.primary_dark
  }
})