import { createSlice } from "@reduxjs/toolkit";

export const userWallSlice = createSlice({
  name: 'userWall',
  initialState: {
    id: 0,
  },
  reducers: {
    setID: (state, action) => {
      return {
        ...state,
        id: action.payload
      }
    }
  }
})
export const { setID } = userWallSlice.actions
export default userWallSlice.reducer