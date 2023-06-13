import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import appointmentReducer from "../features/appointments/appointmentSlice";
import profilReducer from "../features/profile/profileSlice";
import staffReducer from "../features/staff/staffSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    profile: profilReducer,
    staff: staffReducer,
  },
});
