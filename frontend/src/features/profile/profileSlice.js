import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import profileService from "./profileService";
import { toast } from "react-toastify";

const initialState = {
  user_data: null,
  pastAppointments: [],
  todayAppointments: [],
  futureAppointments: [],
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
        if (
          state.futureAppointments.length === 0 &&
          state.pastAppointments.length === 0 &&
          state.todayAppointments.length === 0
        )
          state.user_data.appointments.forEach((appointment) => {
            const appointmentTime = new Date(appointment.time);
            const now = new Date();
            if (
              appointmentTime.getDate() === now.getDate() &&
              appointmentTime.getMonth() === now.getMonth() &&
              appointmentTime.getFullYear() === now.getFullYear()
            ) {
              state.todayAppointments.push(appointment);
            } else if (appointmentTime < now) {
              state.pastAppointments.push(appointment);
            } else {
              state.futureAppointments.push(appointment);
            }
          });
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

export const { reset, splitAppointments } = profileSlice.actions;
export default profileSlice.reducer;
