import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import uuid from 'react-native-uuid';
import PersonalListItem from './PersonalListItem'
import { COLORS } from '../constants/theme'
import PersonalContactItem from './PersonalContactItem'

const WallHeaderAdditionalInfo = ({description, contacts, contactsDetailed, navigation, links}) => {
  if (links) {
    links = links.map(link => ({...link, key: uuid.v4()}))
  }
  let users
  if (contacts && contactsDetailed) {
    users = contacts.map(contact => (
      {
        ...contactsDetailed.find(contactDetailed => contactDetailed.id === contact.user_id), 
        desc: contact.desc,
        key: uuid.v4()
      }
    ))
  }
  
  return (
    <View style={styles.container}>
      {
        description ?
        <PersonalListItem title={'description'} info={description}/> : null 
      }
      {
        links ?
        <Text style={{color: COLORS.secondary, fontSize: 16, textTransform: 'uppercase', margin: 10}}>
          {`Links ${links.length}`}
        </Text> : null
      }
      {
        links ? 
        links.map(link => 
          <PersonalContactItem 
            name={link.name}
            photo={link.photo_100}
            descritption={link.desc}
            navigation={navigation}
          />
        ) : null
      }
      {
        users ?
        <Text style={{color: COLORS.secondary, fontSize: 16, textTransform: 'uppercase', margin: 10}}>
          {`Contacts ${users.length}`}
        </Text> : null
      }
      
      {
        users ? 
        users.map(user => 
          <PersonalContactItem 
            name={`${user.first_name} ${user.last_name}`}
            photo={user.photo_100}
            descritption={user.desc}
            navigation={navigation}
          />
        ) : null
      }

    </View>
  )
}

export default WallHeaderAdditionalInfo

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background_dark,
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  }
})