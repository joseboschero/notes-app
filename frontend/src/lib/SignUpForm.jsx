import { Input, Button, Alert, AlertIcon } from "@chakra-ui/react";

import { useState } from "react";

import PasswordInput from "./PasswordInput";

import signUpService from "../services/signUp";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [parentPassword, setParentPassword] = useState("");

  const [spinner, setSpinner] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const handleDataFromChild = (data) => {
    setParentPassword(data);
  };

  const handleSignUp = async (event) => {
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

      const user = await signUpService.signUp({
        username,
        password: parentPassword,
      });

      setSuccessMessage("Account created successfully");

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

      setUsername("");
      setParentPassword("");

      setUser(user);

      setSpinner(false);
    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        if (status === 400) {
          setErrorMessage("Username already exists");
        }
      }

      setSpinner(false);

      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <>
      <h1 className="text-white text-xl mt-6">Sign Up</h1>
      <form>
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
            <Button onClick={handleSignUp} className="m-2" colorScheme="blue">
              Create account
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

          {successMessage ? (
            <Alert status="success" className="mt-2 rounded-lg">
              <AlertIcon />
              {successMessage}
            </Alert>
          ) : null}
        </div>
      </form>
    </>
  );
}
