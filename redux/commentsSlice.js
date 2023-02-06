import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        profiles: [],
        isAuthorInfoOpen: false,
        authorName: '',
        authorImgUrl: '',
        registrationDate: '',
        authorInfoIsFetching: true 
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
                authorName: action.payload
            }
        },
        setAuthorImgUrl: (state, action) => {
            return {
                ...state,
                authorImgUrl: action.payload
            }
        },
        setRegistrationDate: (state, action) => {
            return {
                ...state,
                registrationDate: action.payload
            }
        }
    }
});
export const {setProfiles, closeAuthorInfo, openAuthorInfo, setAuthorName, setAuthorImgUrl, setRegistrationDate} = commentsSlice.actions;
export default commentsSlice.reducer;