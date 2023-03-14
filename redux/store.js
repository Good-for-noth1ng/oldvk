import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import newsReducer from './newsSlice'
import commentsReducer from "./commentsSlice";
import groupReducer from "./groupSlice";
import searchResultsReducer from "./searchResultsSlice";
import colorSchemeReducer from "./colorSchemeSlice";
import userWallReducer from "./userWallSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        news: newsReducer,
        comments: commentsReducer,
        group: groupReducer,
        searchResults: searchResultsReducer,
        colorScheme: colorSchemeReducer,
        userWall: userWallReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: {
            ignoredPaths: ['user', 'news', 'comments', 'group', 'searchResults', 'colorScheme', 'userWall']
        },
        serializableCheck: { ignoredPaths: ['user', 'news', 'comments', 'group', 'searchResults', 'colorScheme', 'userWall'] }
      })
})