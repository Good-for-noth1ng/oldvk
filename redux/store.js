import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import newsReducer from './newsSlice'
import commentsReducer from "./commentsSlice";
import groupReducer from "./groupSlice";
import searchResultsReducer from "./searchResultsSlice";
import colorSchemeReducer from "./colorSchemeSlice";
import userWallReducer from "./userWallSlice";
import optionsReducer from "./optionsSlice"; 
import radioGenderButtonsReducers from "./radioGenderButtonsSlice";
import relationshipStatusCollapsibleReducer from "./relationshipStatusCollapsibleOption";
import ageCollapsibleReducer from "./ageCollapsibleOption"

export const store = configureStore({
    reducer: {
        user: userReducer,
        news: newsReducer,
        comments: commentsReducer,
        group: groupReducer,
        searchResults: searchResultsReducer,
        colorScheme: colorSchemeReducer,
        userWall: userWallReducer,
        options: optionsReducer,
        radioGender: radioGenderButtonsReducers,
        relationshipStatus: relationshipStatusCollapsibleReducer,
        ageRange: ageCollapsibleReducer
    },
})