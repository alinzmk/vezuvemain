import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUserData } from "../../../admin/AdminApiService";

const initialState = {
  useradmin: [],
};

export const getUserAdmin = createAsyncThunk('getUserAdmin', async() => {
  try {
    const result = await getAllUserData();
    return result.userData
  } catch (error) {
      console.log(error)
  }
})

export const userAdminSlice = createSlice({
  name: "useradmin",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAdmin.fulfilled, (state, action)=>{
        state.useradmin = action.payload
    })
    .addCase(getUserAdmin.rejected, (state, action) => {
      state.useradmin = null; // Clear the dash state on rejection
    });
  }
})


export default userAdminSlice.reducer;
