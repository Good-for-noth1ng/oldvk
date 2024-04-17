import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage'

// let isOnline
// const getUserOnlineStatus = async () => {
//   const onlineStatusStorage = await AsyncStorage.getItem("isCurrentUserOnline");
//   const onlineStatus = JSON.parse(onlineStatusStorage)
//   isOnline = onlineStatus !== null ? onlineStatus : false
// }

// getUserOnlineStatus()

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    accessToken: '',
    expiresIn: '',
    userId: '',
    userProfileDrawerPhotoUrl: '',
    firstName: '',
    lastName: '',
    isOnline: false
  },
  reducers: {
    initUserData: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.payload.accessToken,
        expiresIn: action.payload.expiresIn,
        userId: action.payload.userId,
        userProfileDrawerPhotoUrl: action.payload.userProfileDrawerPhotoUrl,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName, 
      }
    },
    setLogin: (state, action) => {
     // state.isLoggedIn = !state.isLoggedIn
      return {
        ...state,
        isLoggedIn: action.payload ? action.payload : !state.isLoggedIn
      }
    },
    toggleOnlineStatus: (state) => {
      return {
        ...state,
        isOnline: !state.isOnline
      }
    },
    setOnlineStatus: (state, action) => {
      return {
        ...state,
        isOnline: action.payload
      }
    }
  }
})
export const { 
    setLogin, 
    // setAccessToken, 
    // setExpiresIn, 
    // setUserId, 
    // setUserDrawerImageUrl, 
    // setFirstName, 
    // setLastName,
    initUserData,
    toggleOnlineStatus,
    setOnlineStatus
} = userSlice.actions

export default userSlice.reducer