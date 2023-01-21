import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import newsReducer from './newsSlice'
import commentsReducer from "./commentsSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        news: newsReducer,
        comments: commentsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: {
            ignoredPaths: ['user', 'news', 'comments']
        },
        serializableCheck: { ignoredPaths: ['user', 'news', 'comments'] }
      })
})