import { Divider } from "@chakra-ui/react";

import LoginForm from "../lib/LoginForm";
import SignUpForm from "../lib/SignUpForm";

export default function Login() {
  return (
    <div className="bg-[#242424] h-screen">
      <div className="pb-24 pt-10 flex justify-center items-center">
        <h1 className="text-white  text-5xl">Notes App</h1>
      </div>

      <div className="py-8 flex flex-col justify-center items-center">
        <LoginForm />

        <Divider w="20%" />

        <SignUpForm />
      </div>
    </div>
  );
}
