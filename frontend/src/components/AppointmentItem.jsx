import React from "react";

function AppointmentItem({ appointment }) {
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
      <button className="reserve-btn">Reserve</button>
    </div>
  );
}

export default AppointmentItem;
