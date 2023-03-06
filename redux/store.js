import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import newsReducer from './newsSlice'
import commentsReducer from "./commentsSlice";
import groupReducer from "./groupSlice";
import searchResultsReducer from "./searchResultsSlice";
import colorSchemeReducer from "./colorSchemeSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        news: newsReducer,
        comments: commentsReducer,
        group: groupReducer,
        searchResults: searchResultsReducer,
        colorScheme: colorSchemeReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: {
            ignoredPaths: ['user', 'news', 'comments', 'group', 'searchResults', 'colorScheme']
        },
        serializableCheck: { ignoredPaths: ['user', 'news', 'comments', 'group', 'searchResults', 'colorScheme'] }
      })
})