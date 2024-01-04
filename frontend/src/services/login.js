import axios from "axios";

const loginBaseUrl = "https://notes-app-backend-tmv2.onrender.com/users/login";

const login = async (credentials) => {
  const { data } = await axios.post(loginBaseUrl, credentials);

  return data;
};

export default { login };
