import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";



export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        accessToken: '',
        expiresIn: '',
        userId: '',
        userProfileDrawerPhotoUrl: ''
    },
    reducers: {
        setLogin: (state) => {
            state.isLoggedIn = !state.isLoggedIn
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        setExpiresIn: (state, action) => {
            state.expiresIn = action.payload
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        setUserDrawerImageUrl: (state, action) => {
            state.userProfileDrawerPhotoUrl = action.payload
        }
    }
})

export const { setLogin, setAccessToken, setExpiresIn, setUserId, setUserDrawerImageUrl } = userSlice.actions

export default userSlice.reducer