import { createSlice } from "@reduxjs/toolkit";

export const relationshipStatusCollapsibleSlice = createSlice({
  name: 'relationshipStatus',
  initialState: {
    buttons: [
      {
        text: "Not selected",
        id: 0
      },
      {
        text: "Single",
        id: 1,
      },
      {
        text: "In a relationship",
        id: 2,
      },
      {
        text: "Engaged",
        id: 3,
      },
      {
        text: "Married",
        id: 4,
      },
      {
        text: "It's complicated",
        id: 5 
      },
      {
        text: 'Actively searching',
        id: 6,
      },
      {
        text: 'In love',
        id: 7
      },
      {
        text: "In a civil union",
        id: 8,
      },
    ],
    selectedId: 0
  },
  reducers: {
    selectRelatioshipStatus: (state, action) => {
      return {
        ...state,
        selectedId: action.payload
      }
    }
  }
})

export const { selectRelatioshipStatus } = relationshipStatusCollapsibleSlice.actions
export default relationshipStatusCollapsibleSlice.reducer