import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


export const newsSlice = createSlice({
    name: 'news',
    initialState: { 
        items: undefined,
        groups: undefined,
        profiles: undefined,
    },
    reducers: {
        setItems: (state, action) => {
            return {
                ...state,
                items: action.payload
            }
            // state.items = action.payload
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
        getGroupPost: (state, action) => {
            
        }
    },
})
export const { setItems, setGroups, setProfiles } = newsSlice.actions
export default newsSlice.reducer