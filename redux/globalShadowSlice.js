import { createSlice } from "@reduxjs/toolkit";

export const globalShadowSlice = createSlice({
    name: 'globalShadow',
    initialState: {
      isOpen: false,
      onShadowCollapse: null
    },
    reducers: {
      expandShadow: (state, action) => {
        return {
          isOpen: true,
          onShadowCollapse: action.payload && action.payload
        }
      },
      collapseShadow: (state, action) => {
        const onShadowCollapse = state.onShadowCollapse
        if (onShadowCollapse) {
          onShadowCollapse(0)
        }
        return {
          isOpen: false,
          onShadowCollapse: null
        }
      } 
  
    }
  })
  
  export const { expandShadow, collapseShadow } = globalShadowSlice.actions
  export default globalShadowSlice.reducer