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
    setLogin: (state) => {
     // state.isLoggedIn = !state.isLoggedIn
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn
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
    // setAccessToken: (state, action) => {
    //   // state.accessToken = action.payload
    //   return {
    //     ...state,
    //     accessToken: action.payload
    //   }
    // },
    // setExpiresIn: (state, action) => {
    //   // state.expiresIn = action.payload
    //   return {
    //     ...state,
    //     expiresIn: action.payload
    //   }
    // },
    // setUserId: (state, action) => {
    //     // state.userId = action.payload
    //   return {
    //     ...state,
    //     userId: action.payload
    //   }
    // },
    // setUserDrawerImageUrl: (state, action) => {
    //   // state.userProfileDrawerPhotoUrl = action.payload
    //   return {
    //     ...state,
    //     userProfileDrawerPhotoUrl: action.payload
    //   }
    // },
    // setFirstName: (state, action) => {
    //   return {
    //     ...state,
    //     firstName: action.payload
    //   }
    // },
    // setLastName: (state, action) => {
    //   return {
    //     ...state,
    //     lastName: action.payload
    //   }
    // }
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