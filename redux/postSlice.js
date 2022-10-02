import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        data: []
    },
    reducers: {
        setPosts: (state, action) => {
            state.data = action.payload
        }
    }
})
export default postSlice.reducer
