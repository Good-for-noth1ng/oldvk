import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLORS } from '../constants/theme'
import CustomHeader from '../components/CustomHeader'
import DividerWithLine from '../components/DividerWithLine'

const Options = ({navigation}) => {
  const handleDrawerOpening = () => {
    navigation.openDrawer()
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={COLORS.primary}/>
      <CustomHeader 
        headerName={<Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>Options</Text>}
        iconComponent={<Entypo name='menu' color={COLORS.white} size={30}/>}
        iconTouchHandler={handleDrawerOpening}
        isLightTheme={true}
      />
      <View style={styles.buttonsContainer}>
        <DividerWithLine dividerHeight={5} borderTL={5} borderTR={5}/>
        
        <TouchableOpacity style={styles.buttonContainer}>
          <View style={styles.nameAndIconContainer}>
            <FontAwesome5 name='user-alt' size={22} color={COLORS.secondary} style={styles.icon}/>
            <Text style={styles.buttonText}>Учетная запись</Text>
          </View>
          <Entypo name='chevron-right' color={COLORS.secondary} size={22} style={styles.icon}/>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.buttonContainer}>
          <View style={styles.nameAndIconContainer}>
            <FontAwesome5 name='lock' size={22} color={COLORS.secondary} style={styles.icon}/>
            <Text style={styles.buttonText}>Безопасность</Text>
          </View>
          <Entypo name='chevron-right' color={COLORS.secondary} size={22} style={styles.icon}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer}>
          <View style={styles.nameAndIconContainer}>
            <Ionicons name='hand-left' size={22} color={COLORS.secondary} style={styles.icon}/>
            <Text style={styles.buttonText}>Приватность</Text>
          </View>
          <Entypo name='chevron-right' color={COLORS.secondary} size={22} style={styles.icon}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer}>
          <View style={styles.nameAndIconContainer}>
            <FontAwesome name='bell' size={22} color={COLORS.secondary} style={styles.icon}/>
            <Text style={styles.buttonText}>Оповещения</Text>
          </View>
          <Entypo name='chevron-right' color={COLORS.secondary} size={22} style={styles.icon}/>
       </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer}>
          <View style={styles.nameAndIconContainer}>
            <FontAwesome5 name='user-slash' size={22} color={COLORS.secondary} style={styles.icon}/>
            <Text style={styles.buttonText}>Черный список</Text>
          </View>
          <Entypo name='chevron-right' color={COLORS.secondary} size={22} style={styles.icon}/>
        </TouchableOpacity>
        <DividerWithLine dividerHeight={5} borderTL={5} borderTR={5}/>
      </View>
    </SafeAreaView>
  )
}

export default Options

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.light_smoke
  },
  buttonsContainer: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: COLORS.white
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
  },
  nameAndIconContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginLeft: 5, 
    marginRight: 10,
  },
  buttonText: {
    fontSize: 17,
  }
})