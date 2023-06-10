import React from "react";
import { reserveAppointment } from "../features/appointments/appointmentSlice";
import { useSelector, useDispatch } from "react-redux";

function AppointmentItem({ appointment }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(reserveAppointment(appointment));
  };

  return (
    <div className="appointment">
      <div className="time">
        <span>Appointment Time</span>
        <br></br>
        <span>
          {new Date(appointment.time).toLocaleDateString() +
            " " +
            new Date(appointment.time).toLocaleTimeString()}
        </span>
      </div>
      <p className="staff">
        {appointment.doctorName} <br></br> {appointment.doctorSpeciality}
      </p>
      <button className="reserve-btn" onClick={handleClick}>
        Reserve
      </button>
    </div>
  );
}

export default AppointmentItem;
