import React, { useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

import {
  Modal,
  Button,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  ModalContent,
  useDisclosure,
  Textarea,
  Alert,
  AlertIcon,
  IconButton,
  Badge,
} from "@chakra-ui/react";

import notesService from "../services/notes";

import useStore from "../store/store";

export default function NoteCreationModal() {
  const { loggedUserToken, setNewNoteCreated, setStoreCategories } = useStore();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");

  const [descLength, setDescLength] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newCategory, setNewCategory] = useState("");

  const [badgesArray, setBadgesArray] = useState([]);

  const initialRef = React.useRef(null);

  const createNote = async () => {
    try {
      if (!noteTitle) {
        setErrorMessage("Empty title, fill it please");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        return;
      }

      if (descLength > 255) {
        setErrorMessage("Description must have less than 256 chars.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        return;
      }

      const noteContent = {
        title: noteTitle,
        description: noteDesc,
        categories: badgesArray,
      };

      await notesService.createNote(noteContent, loggedUserToken);

      setNewNoteCreated(true);
      setStoreCategories(badgesArray);

      onClose();

      setNoteTitle("");
      setNoteDesc("");
      setBadgesArray([]);
    } catch (error) {
      setErrorMessage("Something went wrong, try again");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const handleBadgeDelete = (index) => {
    const updatedBadgesArray = [...badgesArray];
    updatedBadgesArray.splice(index, 1);
    setBadgesArray(updatedBadgesArray);
  };

  useEffect(() => {
    setDescLength(noteDesc.length);
  }, [noteDesc]);

  useEffect(() => {
    if (descLength > 255) {
      setErrorMessage("Max 255. chars");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  }, [descLength]);

  return (
    <>
      <Button
        rightIcon={<FaPlus />}
        colorScheme="blue"
        variant="solid"
        onClick={onOpen}
      >
        New note
      </Button>

      <Modal
        isCentered
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={noteTitle}
                onChange={({ target }) => setNoteTitle(target.value)}
                ref={initialRef}
                placeholder="Title"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>
                Description{" "}
                <span className="font-thin">{"(Max. 255 char)"}</span>
              </FormLabel>
              <Textarea
                value={noteDesc}
                onChange={({ target }) => setNoteDesc(target.value)}
                placeholder="Description"
              />
              <span className="flex justify-end font-thin opacity-50">
                {descLength}/255
              </span>
            </FormControl>
            <FormControl>
              <FormLabel>Categories</FormLabel>
              <div>
                {badgesArray.map((categoria, index) => (
                  <Badge
                    className="cursor-pointer"
                    key={index}
                    colorScheme="teal"
                    mr={2}
                  >
                    {categoria} <br />
                    <div
                      onClick={() => handleBadgeDelete(index)}
                      className="flex items-center"
                    >
                      <span className="font-thin">Delete</span>
                      <TiDelete width={100} height={100} />
                    </div>
                  </Badge>
                ))}
              </div>
              <div className="flex flex-row items-center gap-2 mt-5">
                <Input
                  onChange={({ target }) => setNewCategory(target.value)}
                  value={newCategory}
                  placeholder="Category"
                  size="sm"
                />
                <IconButton
                  colorScheme="teal"
                  aria-label="add new one"
                  icon={<FaPlus />}
                  size="xs"
                  onClick={() => {
                    setBadgesArray((prevBadgesArray) => [
                      ...prevBadgesArray,
                      newCategory,
                    ]);

                    setNewCategory("");
                  }}
                />
                <FormLabel className="mt-2" fontSize="small">
                  Add category
                </FormLabel>
              </div>
            </FormControl>
            {errorMessage ? (
              <Alert className="mt-2 rounded-md" status="error">
                <AlertIcon />
                {errorMessage}
              </Alert>
            ) : null}
          </ModalBody>

          <ModalFooter>
            <Button onClick={createNote} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
