export const getNameInGroupHeader = (key) => {
  switch (key) {
    case 'audio_playlists':
      return 'audio playlists';
    case 'clips_followers':
      return 'clips followers';
    default:
      return key;
  }
}
    // case key === 'members':
    //   return 'members'
    // case  key === 'albums':
    //   return 'albums'
    // case key === 'audios':
    //   return 'audio'
// case key === 'photos':
    //   return 'photos'