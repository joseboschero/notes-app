import axios from "axios";

const signUpBaseUrl = "http://localhost:3001/users";

const signUp = async (credentials) => {
  const { data } = await axios.post(signUpBaseUrl, credentials);

  return data;
};

export default { signUp };
