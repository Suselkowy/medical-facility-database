import axios from "axios";

const API_URL = "/profile";
const API_USER_URL = "/users/me";
const API_APPOINTMENT_URL = "/appointments/user";

const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_USER_URL, config);

  return response.data;
};

// const getAppointments = async (token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.get(API_APPOINTMENT_URL, config);

//   return response.data;
// };

const profileService = {
  getMe,
};

export default profileService;
