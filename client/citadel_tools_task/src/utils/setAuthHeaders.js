import axios from "axios";

const setAuthHeaders = (jwtToken) => {
  return jwtToken
    ? (axios.defaults.headers.authorization = jwtToken)
    : delete axios.defaults.headers.authorization;
};

export default setAuthHeaders;
