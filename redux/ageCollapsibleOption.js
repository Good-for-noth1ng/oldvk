import { createSlice } from "@reduxjs/toolkit";
import uuid from 'react-native-uuid'

const fromButtonData = [
  {
    id: 64738292,
    text: 'From'
  }
]

const toButtonData = [
  {
    id: 64008292,
    text: 'To'
  }
]

for (let i = 14; i < 81; i++) {
    const fromId = uuid.v4()
    const toId = uuid.v4()
    fromButtonData.push({id: fromId, text: `from ${i}`})
    toButtonData.push({id: toId, text: `to ${i}`})
}

export const ageCollapsibleSlice = createSlice({
  name: 'ageRange',
  initialState: {
    fromButton: {
      id: 137049350,
      buttonListItems: fromButtonData
    },
    toButton: {
      id: 137049353,
      buttonListItems: toButtonData
    }
  },
  reducers: {}
})

export default ageCollapsibleSlice.reducer