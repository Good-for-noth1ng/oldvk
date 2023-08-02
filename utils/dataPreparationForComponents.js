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

export const findPostAuthor = (item, profiles, groups) => {
  let repost
  if (item.copy_history !== undefined) {
    repost = findPostAuthor(item.copy_history[0], profiles, groups)
  }
  let author = profiles.find(profile => profile.id === item.from_id || profile.id === item.source_id)
  const signer = profiles.find(profile => profile.id === item.signer_id)
  if (author === undefined) {
    author = groups.find(group => group.id === (-1 * item.from_id) || group.id === (-1 * item.source_id))
  }
  const key = uuid.v4()
  return {
    ...item,
    author,
    key,
    signer,
    copy_history: repost ? [repost] : undefined
  }
}