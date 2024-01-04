import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Input, Alert, AlertIcon, Button } from "@chakra-ui/react";

import PasswordInput from "../lib/PasswordInput";

import loginService from "../services/login";

import useStore from "../store/store";

export default function LoginForm() {
  const { addLoggedUserToken } = useStore();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [parentPassword, setParentPassword] = useState("");

  const handleDataFromChild = (data) => {
    setParentPassword(data);
  };

  const [user, setUser] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      navigate("/notes");
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !parentPassword) {
      setErrorMessage("Empty username or password");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    try {
      setSpinner(true);

      const user = await loginService.login({
        username,
        password: parentPassword,
      });

      addLoggedUserToken(user.token);

      setUser(user);

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setUsername("");
      setParentPassword("");
      setSpinner(false);

      navigate("/notes");
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setSpinner(false);

      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <>
      <h1 className="text-white text-xl">Sign in</h1>

      <form className="mb-6">
        <div className="flex-col flex">
          <div className="m-2">
            <Input
              variant="filled"
              placeholder="Username"
              className="focus:text-white"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className="m-2">
            <PasswordInput sendDataToParent={handleDataFromChild} />
          </div>

          {!spinner ? (
            <Button onClick={handleLogin} className="m-2" colorScheme="blue">
              Login
            </Button>
          ) : (
            <Button isLoading className="m-2" colorScheme="blue" />
          )}

          {errorMessage ? (
            <Alert status="error" className="mt-2 rounded-lg">
              <AlertIcon />
              {errorMessage}
            </Alert>
          ) : null}
        </div>
      </form>
    </>
  );
}
