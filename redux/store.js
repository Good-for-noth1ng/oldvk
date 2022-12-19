import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import newsReducer from './newsSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        news: newsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: {
            ignoredPaths: ['user', 'news']
        },
        serializableCheck: { ignoredPaths: ['user', 'news'] }
      })
})