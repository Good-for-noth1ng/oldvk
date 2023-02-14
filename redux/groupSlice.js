import { createSlice } from "@reduxjs/toolkit";

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    id: null
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
    }
  },
})
export const { setID } = groupSlice.actions
export default groupSlice.reducer