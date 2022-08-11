import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setLogin: (state, action) => {
            state.isLoggedIn = !state.isLoggedIn
        }
    }
})

export const { setLogin } = userSlice.actions

export default userSlice.reducer