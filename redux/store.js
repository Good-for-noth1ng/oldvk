import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import newsReducer from './newsSlice'
import commentsReducer from "./commentsSlice";
import groupReducer from "./groupSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        news: newsReducer,
        comments: commentsReducer,
        group: groupReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: {
            ignoredPaths: ['user', 'news', 'comments, group']
        },
        serializableCheck: { ignoredPaths: ['user', 'news', 'comments', 'group'] }
      })
})