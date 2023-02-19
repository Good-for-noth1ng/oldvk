import { createSlice } from "@reduxjs/toolkit";

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    id: null,
    offset: 0,
    items: [],
    groups: [],
    profiles: []
  },
  reducers: {
    setID: (state, action) => {
      let id 
      if (action.payload > 0) {
        id = action.payload * (-1)
      } else {
        id = action.payload
      }
      return {
        ...state,
        id: id
      }
    },
    increaseOffset: (state, action) => {
      return {
        ...state,
        offset: state.offset + 20
      }
    },
    setData: (state, action) => {
      return {
        ...state,
        items: action.payload.items,
        groups: action.payload.groups,
        profiles: action.payload.profiles,
        offset: state.offset + 20
      }
    },
    pushData: (state, action) => {
      return {
        ...state,
        items: state.items.concat(action.payload.items),
        groups: state.groups.concat(action.payload.groups),
        profiles: state.profiles.concat(action.payload.profiles),
        offset: state.offset + 20
      }
    }
  },
})
export const { setID, setData, pushData } = groupSlice.actions
export default groupSlice.reducer