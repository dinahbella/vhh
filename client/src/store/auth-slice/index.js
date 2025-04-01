import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

// ✅ REGISTER USER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/auth/register",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      //   state.user = action.payload;
      //   state.isAuthenticated = !!action.payload;
    },
    // logoutUser: (state) => {
    //   state.user = null;
    //   state.isAuthenticated = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true; // ✅ user is now authenticated
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
