import { createSlice } from "@reduxjs/toolkit";

export const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    sound: null,
    info: null,
    prev: null,
    prevInfo: null
  },
  reducers: {
    updateTrack: (state, action) => {
      return {
        sound: action.payload.sound,
        info: action.payload.info,
        prev: state.sound,
        prevInfo: state.info
      }
    }
  }
})
export const { updateTrack } = audioSlice.actions;
export default audioSlice.reducer