import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        data: []
    },
    reducers: {
        setPosts: (state, action) => {
            state.data.push(action.payload)
        }
    }
})
export const { setPosts } = postSlice.actions
export default postSlice.reducer
