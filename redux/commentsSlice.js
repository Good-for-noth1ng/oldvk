import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        profiles: [],
        isAuthorInfoOpen: false,
        authorName: '',
        authorImgUrl: '',
        registrationDate: '',
        authorInfoIsFetching: false 
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
        },
        startLoadingRegistrationDate: (state, action) => {
            return {
                ...state,
                authorInfoIsFetching: true
            }
        },
        stopLoadingRegistrationDate: (state, action) => {
            return {
                ...state,
                authorInfoIsFetching: false
            }
        }
    }
});
export const { 
    setProfiles,
    closeAuthorInfo, 
    openAuthorInfo, 
    setAuthorName, 
    setAuthorImgUrl, 
    setRegistrationDate,
    startLoadingRegistrationDate,
    stopLoadingRegistrationDate
} = commentsSlice.actions;
export default commentsSlice.reducer;