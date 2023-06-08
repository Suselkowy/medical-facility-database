// File for sending, receiving data from backend auth
import axios from "axios";

const API_URL = "/appointments";

const getAppointments = async (filterData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...filterData,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const getSpecialities = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/staff/specialities", config);

  return response.data;
};

const appointmentService = {
  getAppointments,
  getSpecialities,
};

export default appointmentService;
