import axios from "axios";

const loginBaseUrl = "http://localhost:3001/users/login";

const login = async (credentials) => {
  const { data } = await axios.post(loginBaseUrl, credentials);

  return data;
};

export default { login };
