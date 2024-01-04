import Login from "./pages/Login.jsx";
import Notes from "./pages/Notes.jsx";
import NotFound from "./pages/NotFound.jsx";

import { Routes, Route } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    window.localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []);

  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ChakraProvider>
  );
}
