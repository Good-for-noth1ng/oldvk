import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import newsReducer from './newsSlice'
import postReducer from './postSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        news: newsReducer,
        post: postReducer        
    }
})