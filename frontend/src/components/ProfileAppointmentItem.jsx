import React from "react";
import { reserveAppointment } from "../features/appointments/appointmentSlice";
import { useSelector, useDispatch } from "react-redux";

function ProfileAppointmentItem({ appointment, isCancelable }) {
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
        {appointment.fullData.name} <br></br> {appointment.fullData.speciality}
      </p>
      {isCancelable === true ? (
        <button onClick={() => {}} className="delete-button">
          Cancel
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProfileAppointmentItem;
