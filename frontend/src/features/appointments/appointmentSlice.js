import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appointmentService from "./appointmentService";

const initialState = {
  appointments: [],
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
      });
  },
});

export const getAppointments = createAsyncThunk(
  "appiontments/getAll",
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

export const { reset } = appointmentSlice.actions;
export default appointmentSlice.reducer;
