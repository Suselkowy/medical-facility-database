import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAppointments
} from "../features/staff/staffSlice";
import StaffAppointmentItem from "../components/StaffAppointmentItem";


const StaffDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todaysAppointments = useSelector(
    (state) => state.staff.todaysAppointments
  );
  const futureAppointments = useSelector(
    (state) => state.staff.futureAppointments
  );
  const loading = useSelector((state) => state.staff.loading);
  const error = useSelector((state) => state.staff.error);

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Todays Appointments</h2>
      <section className="appointmentContainer">
        {todaysAppointments.length > 0 ? (
          <>
            {todaysAppointments.map((appointment) => (
              <StaffAppointmentItem
                key={appointment._id}
                appointment={appointment}
                startable={true}
              />
            ))}
          </>
        ) : (
          <h3>No appointments found</h3>
        )}
      </section>
      <h2>Future Appointments</h2>
      <section className="appointmentContainer">
        {futureAppointments.length > 0 ? (
          <>
            {futureAppointments.map((appointment) => (
              <StaffAppointmentItem
                key={appointment._id}
                appointment={appointment}
              />
            ))}
          </>
        ) : (
          <h3>No appointments found</h3>
        )}
      </section>
    </div>
  );
};

export default StaffDashboard;
