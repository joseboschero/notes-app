import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react";

import { useState, useEffect } from "react";

export default function PasswordInput(props) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [password, setPassword] = useState("");
  useEffect(() => {
    props.sendDataToParent(password);
  }, [password, props.sendDataToParent]);

  const handleInputChange = ({ target }) => {
    const newPassword = target.value;
    setPassword(newPassword);
  };

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Password"
        variant="filled"
        className="focus:text-white"
        value={password}
        onChange={handleInputChange}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
