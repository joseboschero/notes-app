import { Button, Radio, RadioGroup, Stack, Select } from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { CiLogout } from "react-icons/ci";

import noteServices from "../services/notes";

import NoteCreationModal from "./NoteCreationModal";

import useStore from "../store/store";

export default function NotesMenu() {
  const {
    setStoreRadioValue,
    loggedUserToken,
    setStoreCategories,
    storeCategories,
    setStoreFilteredNotes,
  } = useStore();

  const navigate = useNavigate();

  const [radioValue, setRadioValue] = useState("1");

  const [categories, setCategories] = useState();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");

    const backToLogin = window.localStorage.getItem("loggedUser");

    if (!backToLogin) {
      navigate("/");
    }
  };

  const handleCategoryFiltering = async (value) => {
    try {
      const allNotes = await noteServices.categoryFilteredNotes(
        loggedUserToken
      );

      const filteredNotes = allNotes.filter((note) =>
        note.categories.includes(value)
      );

      setStoreFilteredNotes(filteredNotes);
    } catch (error) {
      console.error("Error fetching or filtering notes:", error);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const notes = await noteServices.getAllNotes(loggedUserToken);

        const uniqueCategories = Array.from(
          new Set(notes.flatMap((note) => note.categories))
        );

        setStoreCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    setStoreRadioValue(radioValue);
  }, [radioValue]);

  return (
    <>
      <div className="fixed flex items-center justify-between top-0 left-0 bg-[#464646] w-full z-10">
        <div className="flex items-center gap-4">
          <div className="m-2">
            <NoteCreationModal />
          </div>
          <div className="m-2">
            <h1 className="font-bold">List by:</h1>
            <RadioGroup onChange={setRadioValue} value={radioValue}>
              <Stack direction="row">
                <Radio value="1">All Notes</Radio>
                <Radio value="2">Active Notes</Radio>
                <Radio value="3">Archived Notes</Radio>
              </Stack>
            </RadioGroup>
          </div>
          <div className="m-2 flex ">
            <h1 className="font-bold">Filter by:</h1>
            <Select
              variant="filled"
              bg="teal"
              _hover={{ bg: "teal", opacity: "70%" }}
              placeholder="Categories"
              onChange={({ target }) => {
                handleCategoryFiltering(target.value);
              }}
            >
              <option key="none" value="none">
                None
              </option>
              {storeCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="m-2">
          <Button
            onClick={handleLogout}
            rightIcon={<CiLogout />}
            colorScheme="blue"
            variant="solid"
          >
            Log Out
          </Button>
        </div>
      </div>
    </>
  );
}
