import React from "react";
import { updateAppointmentStaff } from "../features/staff/staffSlice";
import { useSelector, useDispatch } from "react-redux";

function StaffAppointmentItem({ appointment, startable }) {
  startable = startable || false;
  const dispatch = useDispatch();
  const startClick = () => {
    const modAppointment = { ...appointment, newState: "fulfilled" };
    dispatch(updateAppointmentStaff(modAppointment));
  };
  const cancelClick = () => {
    const modAppointment = { ...appointment, newState: "canceled" };
    dispatch(updateAppointmentStaff(modAppointment));
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
      <div
        className={
          appointment.status == "canceled"
            ? "red info"
            : appointment.status == "pending"
            ? "orange info"
            : "green info"
        }
      >
        Status: {appointment.status}
      </div>
      <p className="info">
        {appointment.patient ? (
          <p>
            {appointment.patient.name} <br></br> {appointment.patient.age}
          </p>
        ) : (
          <p>No patient</p>
        )}
      </p>
      {appointment.status != "fulfilled" ? (
        <button className="reserve-btn" onClick={startClick}>
          Start
        </button>
      ) : (
        <button className="reserve-btn hidden">Start</button>
      )}
      {appointment.status != "canceled" ? (
        <button className="reserve-btn" onClick={cancelClick}>
          Cancel
        </button>
      ) : (
        <button className="reserve-btn hidden">Cancel</button>
      )}
    </div>
  );
}

export default StaffAppointmentItem;
