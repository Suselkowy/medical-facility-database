import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";
import { toast } from "react-toastify";

const initialState = {
  user_data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user_data = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const getMe = createAsyncThunk("profile/me", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await profileService.getMe(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// export const getAppointments = createAsyncThunk(
//   "profile/appointments",
//   async (_, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await profileService.getAppointments(token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
