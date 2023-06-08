import React from "react";

function AppointmentItem({ appointment }) {
  return (
    <div className="appointment">
      <div>
        {new Date(appointment.time).toLocaleDateString() +
          " " +
          new Date(appointment.time).toLocaleTimeString()}
      </div>
      <h2>{appointment.staff}</h2>
    </div>
  );
}

export default AppointmentItem;
