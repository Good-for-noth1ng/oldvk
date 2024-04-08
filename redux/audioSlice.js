import { createSlice } from "@reduxjs/toolkit";

export const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    sound: null,
    info: null,
    prev: null,
    prevInfo: null,
    audios: [],
    index: 0
  },
  reducers: {
    updateTrack: (state, action) => {
      return {
        sound: action.payload.sound,
        info: action.payload.info,
        audios: action.payload.audios,
        index: action.payload.index,
        prev: state.sound,
        prevInfo: state.info,
      }
    },
  }
})
export const { updateTrack } = audioSlice.actions;
export default audioSlice.reducer