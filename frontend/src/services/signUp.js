import axios from "axios";

const signUpBaseUrl = "https://notes-app-backend-tmv2.onrender.com/users";

const signUp = async (credentials) => {
  const { data } = await axios.post(signUpBaseUrl, credentials);

  return data;
};

export default { signUp };
