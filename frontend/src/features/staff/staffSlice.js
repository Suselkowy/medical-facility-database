import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import staffService from "../staff/staffService";
import { toast } from "react-toastify";

const initialState = {
  todaysAppointments: [],
  futureAppointments: [],
  isLoading: false,
  isError: null,
  message: "",
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        // console.log("ok");
        state.isLoading = false;
        state.isSuccess = true;
        state.todaysAppointments = [];
        state.futureAppointments = [];
        action.payload.forEach((appointment) => {
          const appointmentTime = new Date(appointment.time);
          const now = new Date();
          if (
            appointmentTime.getDate() === now.getDate() &&
            appointmentTime.getMonth() === now.getMonth() &&
            appointmentTime.getFullYear() === now.getFullYear()
          )
            state.todaysAppointments.push(appointment);
          else if (appointmentTime < now) {
          } else state.futureAppointments.push(appointment);
        });
        state.isLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAppointmentStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAppointmentStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success(action.payload.message);
        state.todaysAppointments = state.todaysAppointments.map(
          (appointment) => {
            if (appointment.id != action.payload.id) return appointment;
            else {
              appointment.state = action.payload.state;
            }
          }
        );
        state.futureAppointments = state.futureAppointments.map(
          (appointment) => {
            if (appointment.id != action.payload.id) return appointment;
            else {
              appointment.state = action.payload.state;
            }
          }
        );
      })
      .addCase(updateAppointmentStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const getAppointments = createAsyncThunk(
  "staff/getAppointments",
  async (_, thunkAPI) => {
    try {
      console.log("sending");
      const token = thunkAPI.getState().auth.user.token;
      const state = thunkAPI.getState();
      return await staffService.getAppointments(state, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateAppointmentStaff = createAsyncThunk(
  "staff/updateAppointmentsStaff",
  async (appointmentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await staffService.updateAppointmentStaff(appointmentData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const { reset } = staffSlice.actions;

export default staffSlice.reducer;
