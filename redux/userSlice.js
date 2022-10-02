import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";



export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        accessToken: '',
        expiresIn: '',
        userId: '',
        userProfileDrawerPhotoUrl: '',
        firstName: '',
        lastName: ''
    },
    reducers: {
        setLogin: (state) => {
            // state.isLoggedIn = !state.isLoggedIn
            return {
                ...state,
                isLoggedIn: !state.isLoggedIn
            }
        },
        setAccessToken: (state, action) => {
            // state.accessToken = action.payload
            return {
                ...state,
                accessToken: action.payload
            }
        },
        setExpiresIn: (state, action) => {
            // state.expiresIn = action.payload
            return {
                ...state,
                expiresIn: action.payload
            }
        },
        setUserId: (state, action) => {
            // state.userId = action.payload
            return {
                ...state,
                userId: action.payload
            }
        },
        setUserDrawerImageUrl: (state, action) => {
            // state.userProfileDrawerPhotoUrl = action.payload
            return {
                ...state,
                userProfileDrawerPhotoUrl: action.payload
            }
        },
        setFirstName: (state, action) => {
            return {
                ...state,
                firstName: action.payload
            }
        },
        setLastName: (state, action) => {
            return {
                ...state,
                lastName: action.payload
            }
        }
    }
})

export const { 
    setLogin, 
    setAccessToken, 
    setExpiresIn, 
    setUserId, 
    setUserDrawerImageUrl, 
    setFirstName, 
    setLastName 
} = userSlice.actions

export default userSlice.reducer