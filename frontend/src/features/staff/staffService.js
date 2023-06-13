

import axios from "axios";

const API_BASE_URL = "/staff";


const getAppointments = async (state, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // console.log(state, token); // TODO DEBUG delete me
    // console.log(state.auth.user._id);
    const response = await axios.get(`${API_BASE_URL}/${state.auth.user._id}/appointments`, config);
    // console.log(response, response.data); // TODO DEBUG delete me
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};


const staffService = {
  getAppointments
};

export default staffService;