import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};



export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
    incrementByAmount: (state, action) => {
      state.counter += action.payload;
    },
  },
});

export const { increment } = counterSlice.actions;

export default counterSlice.reducer;
