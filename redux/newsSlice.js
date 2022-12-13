import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import uuid from 'react-native-uuid'

export const newsSlice = createSlice({
    name: 'news',
    initialState: { 
        items: [],
        groups: [],
        profiles: [],
        currentPage: 'News'
    },
    reducers: {
        setItems: (state, action) => {
            return {
                ...state,
                items: action.payload
            }
        },
        setGroups: (state, action) => {
            return {
                ...state,
                groups: action.payload
            }
        },
        setProfiles: (state, action) => {
            return {
                ...state,
                profiles: action.payload
            }
        },
        setComments: (state, action) => {
            return {
                ...state,
                comments: action.payload
            }
        },
        setCurrentPage: (state, action) => {
            return {
                ...state,
                currentPage: action.payload
            }
        }
    },
})
export const { setItems, setGroups, setProfiles, setCurrentPage } = newsSlice.actions
export default newsSlice.reducer