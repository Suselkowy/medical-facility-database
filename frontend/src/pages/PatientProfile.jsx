import React, { useState, useEffect } from "react";
import "../components/css/Login.css";
import "../components/css/PatientProfile.css";
import "../components/css/ProfileAppointments.css";
import ProfileAppointmentItem from "../components/ProfileAppointmentItem";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, getMe } from "../features/profile/profileSlice";
import Spinner from "../components/spinner";

function PatientProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    user_data,
    pastAppointments,
    todayAppointments,
    futureAppointments,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getMe());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  if (user_data) {
    return (
      <>
        <div className="patient-info">
          <h1 className="header">Patient Information</h1>
          <div className="info-container">
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">{user_data.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Age:</span>
              <span className="info-value">{user_data.age}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Address:</span>
              <span className="info-value">{user_data.address}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Medical History:</span>
              <span className="info-value">
                {user_data.medicalHistory
                  ? user_data.medicalHistory.join(", ")
                  : "None"}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Current Condition:</span>
              <span className="info-value">
                {user_data.currentCondition
                  ? user_data.currentCondition
                  : "None"}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Room:</span>
              <span className="info-value">
                {user_data.room ? user_data.room : "None"}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="column">
            <h3>Past Appointments</h3>
            {pastAppointments.map((appointment) => (
              <ProfileAppointmentItem
                key={appointment._id}
                appointment={appointment}
                isCancelable={false}
              />
            ))}
          </div>

          <div className="column">
            <h3>Appointments for Today</h3>
            {todayAppointments.map((appointment) => (
              <ProfileAppointmentItem
                key={appointment._id}
                appointment={appointment}
                isCancelable={false}
              />
            ))}
          </div>

          <div className="column">
            <h3>Future Appointments</h3>
            {futureAppointments.map((appointment) => (
              <ProfileAppointmentItem
                key={appointment._id}
                appointment={appointment}
                isCancelable={true}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default PatientProfile;
