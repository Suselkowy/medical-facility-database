import React, { useState, useEffect } from "react";
import "../components/css/Login.css";
import "../components/css/appointment.css";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  reset,
  getAppointments,
  getSpecialities,
} from "../features/appointments/appointmentSlice";
import Spinner from "../components/spinner";
import AppointmentItem from "../components/AppointmentItem";

function PatientDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    day: "",
    hourStart: "",
    hourEnd: "",
    speciality: "",
  });

  const { day, hourStart, hourEnd, speciality } = formData;

  const { user } = useSelector((state) => state.auth);
  const { appointments, specialities, isLoading, isError, message } =
    useSelector((state) => state.appointments);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      day,
      hourStart,
      hourEnd,
      speciality,
    };

    dispatch(getAppointments(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getSpecialities());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="login-container">
        <h2>Wyszukaj wizytę</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="day">Day</label>
            <input
              type="date"
              id="day"
              name="day"
              value={day}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hourStart">Hours</label>
            <input
              type="time"
              id="hourStart"
              name="hourStart"
              value={hourStart}
              onChange={onChange}
            />
            <label htmlFor="hourEnd">to</label>
            <input
              type="time"
              id="hourEnd"
              name="hourEnd"
              value={hourEnd}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="speciality">Speciality</label>
            <select
              id="speciality"
              name="speciality"
              value={speciality}
              onChange={onChange}
            >
              {specialities.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
      <section className="appointmentContainer">
        {appointments.length > 0 ? (
          <>
            {appointments.map((appointment) => (
              <AppointmentItem
                key={appointment._id}
                appointment={appointment}
              />
            ))}
          </>
        ) : (
          <h3>No appointments foud</h3>
        )}
      </section>
    </>
  );
}

export default PatientDashboard;

// function PatientDashboard() {
//   const [formData, setFormData] = useState({
//     day: "",
//     hour_start: "",
//     hour_end: "",
//     doctor: "",
//   });

//   const { day, hour_start, hour_end, doctor } = formData;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }

//     if (isSuccess || user) {
//       console.log("success");
//       if (user.type === "staff") {
//         navigate("/staff-dashboard");
//       } else {
//         navigate("/patient-dashboard");
//       }
//     }

//     dispatch(reset());
//   }, [user, isError, isSuccess, message, navigate, dispatch]);

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     const userData = {
//       day,
//       hour_start,
//       hour_end,
//       doctor,
//     };
//     console.log(userData);

//     dispatch(login(userData));
//   };

//   if (isLoading) {
//     return <Spinner />;
//   }

//   return (
//     <>
//       <div className="login-container">
//         <h2>Wyszukaj wizytę</h2>
//         <form onSubmit={onSubmit}>
//           <div className="form-group">
//             <label htmlFor="day">Day</label>
//             <input
//               type="date"
//               id="day"
//               name="day"
//               value={day}
//               onChange={onChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="hour_start">Hours</label>
//             <input
//               type="time"
//               id="hour_start"
//               name="hour_start"
//               value={hour_start}
//               onChange={onChange}
//             />
//             <label htmlFor="hour_end">to</label>
//             <input
//               type="time"
//               id="hour_end"
//               name="hour_end"
//               value={hour_end}
//               onChange={onChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="doctor">Doctor</label>
//             <input
//               type="text"
//               id="doctor"
//               name="doctor"
//               value={doctor}
//               onChange={onChange}
//             />
//           </div>
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </>
//   );
// }
