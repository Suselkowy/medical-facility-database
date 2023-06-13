import React from "react";
import { cancelAppointment } from "../features/appointments/appointmentSlice";
import { useSelector, useDispatch } from "react-redux";

function StaffAppointmentItem({ appointment, startable }) {
  startable = startable || false;
  const dispatch = useDispatch();
  const startClick = () => {
    // TODO
    // dispatch(reserveAppointment(appointment));
  };
  const cancelClick = () => {
    dispatch(cancelAppointment(appointment));
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
      <p className="info">
          {appointment.patient ? (<p>{appointment.patient.name} <br></br> {appointment.patient.age}</p>) : (<p>No patient</p>)}
      </p>
      {startable ? (<button className="reserve-btn" onClick={startClick}>
        Start
      </button>) : null}
      <button className="reserve-btn" onClick={cancelClick}>
        Cancel
      </button>
    </div>
  );
}

export default StaffAppointmentItem;
