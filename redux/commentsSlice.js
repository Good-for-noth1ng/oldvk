import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        profiles: [],
        isAuthorInfoOpen: false,
        authorName: '',
        authorImgUrl: '',
    },
    reducers: {
        setProfiles: (state, action) => {
            return {
                ...state,
                profiles: action.payload
            }
        },
        closeAuthorInfo: (state, action) => {
            return {
                ...state,
                isAuthorInfoOpen: false
            }
        },
        openAuthorInfo: (state, action) => {
            return {
                ...state,
                isAuthorInfoOpen: true
            }
        },
        setAuthorName: (state, action) => {
            return {
                ...state,
                authorFirstName: action.payload
            }
        },
        setAuthorImgUrl: (state, action) => {
            return {
                ...state,
                authorImgUrl: action.payload
            }
        }
    }
});
export const {setProfiles, closeAuthorInfo, openAuthorInfo, setAuthorName, setAuthorImgUrl} = commentsSlice.actions;
export default commentsSlice.reducer;