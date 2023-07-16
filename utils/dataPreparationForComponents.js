import uuid from 'react-native-uuid';
export const cleanAdditionalInfoLinksAndUsers = (links, contacts, contactsDetailed) => {
  let cleanedLinks, cleanedUsers
  if (links) {
    cleanedLinks = links.map(link => ({...link, key: uuid.v4()}))
        // console.log(cleanedLinks)
  }
  if (contacts && contactsDetailed) {
    cleanedUsers = contacts.map(contact => (
      {
        ...contactsDetailed.find(contactDetailed => contactDetailed.id === contact.user_id), 
        desc: contact.desc,
        key: uuid.v4()
      }
    ))
  }
  return {cleanedLinks, cleanedUsers}
}