import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        profiles: []
    },
    reducers: {
        setProfiles: (state, action) => {
            return {
                profiles: action.payload
            }
        },
    }
});
export const {setProfiles} = commentsSlice.actions;
export default commentsSlice.reducer;