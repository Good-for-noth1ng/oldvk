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
        },
        {
          type: 'switcher',
          name: 'Allow comments',
          iconName: 'comment',
          iconType: 'FontAwesome',
          value: false,
          key: uuid.v4(),
        },
      ]
    },
    notifications: {},
    blacklist: {},
  },
  reducers: {

  }
});
export default optionsSlice.reducer;