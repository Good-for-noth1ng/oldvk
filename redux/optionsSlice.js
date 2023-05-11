import { createSlice } from "@reduxjs/toolkit";
import uuid from 'react-native-uuid';

export const optionsSlice = createSlice({
  name: 'options',
  initialState: {
    account: {},
    security: {},
    privacy: {
      items: [
        {
          type: 'switcher',
          name: 'Show by default my posts',
          iconName: 'pencil-square-o',
          iconType: 'FontAwesome',
          value: false,
          key: uuid.v4(),
          handler: null
        },
        {
          type: 'switcher',
          name: 'Allow comments',
          iconName: 'comment',
          iconType: 'FontAwesome',
          value: false,
          key: uuid.v4(),
          handler: null
        },
      ]
    },
    notifications: {},
    blacklist: {},
  },
  reducers: {
    setNoWallReplies: (state, action) => {
      const noWallReplies = !state.privacy.items[1].value
      return {
        ...state,
        privacy: {
          ...state.privacy,
          items: [
            {
              ...state.privacy.items[0],
              value: state.privacy.items[0].value,
            },
            {
              ...state.privacy.items[1],
              value: noWallReplies
            },    
          ]
        }
      }
    },
    setOwnPostsDefault: (state, action) => {
      const ownPostsDefault = !state.privacy.items[0].value
      return {
        ...state,
        privacy: {
          ...state.privacy,
          items: [
            {
              ...state.privacy.items[0],
              value: ownPostsDefault,
            },
            {
              ...state.privacy.items[1],
              value: state.privacy.items[1].value,
            },    
          ]
        }
      }
    },
    setPrivacyProperties: (state, action) => {
      const ownPostsDefault = action.payload.own_posts_default === 1 ? true : false
      const noWallReplies = action.payload.no_wall_replies === 0 ? true : false
      const ownPostsDefaultHandler = action.payload.ownPostsDefaultHandler
      const noWallRepliesHandler = action.payload.noWallRepliesHandler
      return {
        ...state,
        privacy: {
          ...state.privacy,
          items: [
            {
              ...state.privacy.items[0],
              value: ownPostsDefault,
              handler: ownPostsDefaultHandler
            },
            {
              ...state.privacy.items[1],
              value: noWallReplies,
              handler: noWallRepliesHandler
            },    
          ]
        }
      }
    }
  }
});

export const { setPrivacyProperties, setNoWallReplies, setOwnPostsDefault } = optionsSlice.actions
export default optionsSlice.reducer;