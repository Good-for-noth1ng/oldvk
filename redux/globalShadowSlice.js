import { createSlice } from "@reduxjs/toolkit";

export const globalShadowSlice = createSlice({
    name: 'globalShadow',
    initialState: {
      isOpen: false,
      dropdownX: 0,
      dropdownY: 0,
      data: null
    },
    reducers: {
      expandShadow: (state, action) => {
        return {
          ...state,
          isOpen: true,
          dropdownX: action.payload.dropdownX,
          dropdownY: action.payload.dropdownY
        }
      },
      collapseShadow: (state, action) => {
        return {
          ...state,
          isOpen: false,  
        }
      } 
  
    }
  })
  
  export const { expandShadow, collapseShadow } = globalShadowSlice.actions
  export default globalShadowSlice.reducer