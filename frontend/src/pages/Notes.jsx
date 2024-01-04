import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import NotesMenu from "../lib/NotesMenu";
import NotesHolder from "../lib/NotesHolder";

export default function Notes() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (!loggedUserJSON) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="h-full flex bg-[#242424] relative">
        <NotesMenu />

        <NotesHolder />
      </div>
    </>
  );
}
