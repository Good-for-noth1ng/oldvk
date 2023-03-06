import { createSlice } from "@reduxjs/toolkit";

export const colorSchemeSlice = createSlice({
    name: 'colorScheme',
    initialState: {
        currentColorScheme: 'light'
    },
    reducers: {
        toggleCurrentColorScheme: (state, action) => {
            return {
                ...state,
                currentColorScheme: !state.currentColorScheme 
            }
        }
    }
});
export const { toggleCurrentColorScheme } = colorSchemeSlice.actions;
export default colorSchemeSlice.reducer;
