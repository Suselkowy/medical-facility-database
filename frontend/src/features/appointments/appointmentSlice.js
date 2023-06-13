import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appointmentService from "./appointmentService";
import { toast } from "react-toastify";

const initialState = {
  appointments: [],
  specialities: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const appointmentSlice = createSlice({
  name: "appointments",
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
        state.isLoading = false;
        state.isSuccess = true;
        state.appointments = action.payload;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSpecialities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpecialities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.specialities = action.payload;
      })
      .addCase(getSpecialities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(reserveAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reserveAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.appointments = state.appointments.filter(
          (appointment) => appointment._id != action.payload.id
        );
        toast.success(action.payload.message);
      })
      .addCase(reserveAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const getAppointments = createAsyncThunk(
  "appointments/getAll",
  async (filterData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await appointmentService.getAppointments(filterData, token);
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

export const reserveAppointment = createAsyncThunk(
  "appointments/reserve",
  async (appointmentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await appointmentService.reserveAppointment(
        appointmentData,
        token
      );
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

export const getSpecialities = createAsyncThunk(
  "appointments/getSpecialities",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await appointmentService.getSpecialities(token);
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

export const cancelAppointment = createAsyncThunk(
  "appointments/cancel",
  async (appointmentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await appointmentService.cancelAppointment(appointmentData, token);
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

export const { reset } = appointmentSlice.actions;
export default appointmentSlice.reducer;
