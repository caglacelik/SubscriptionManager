import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

export const keySlice = createSlice({
    name: "key",
    initialState: { value: false },
    reducers: {
      changeKey: (state, action) => {
        state.value = !state.value;
      },
    },
  });
  
  export const { changeKey } = keySlice.actions;
  
  export default keySlice.reducer;
