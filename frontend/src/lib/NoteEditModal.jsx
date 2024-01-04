import React, { useEffect, useState } from "react";

import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";

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
  Badge,
  IconButton,
} from "@chakra-ui/react";

import noteService from "../services/notes";

import useStore from "../store/store";

export default function NoteEditModal(props) {
  const {
    loggedUserToken,
    setStoreEditedNote,
    removeStoreCategory,
    setStoreCategories,
  } = useStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [descLength, setDescLength] = useState(0);

  const initialRef = React.useRef(null);

  useEffect(() => {
    setNoteTitle(props.noteTitle);
    setNoteDesc(props.noteDesc);
  }, [props.noteTitle, props.noteDesc]);

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

  const handleTitleChange = (event) => {
    setNoteTitle(event.target.value);
  };

  const handleDescChange = (event) => {
    const descValue = event.target.value;
    setNoteDesc(descValue);
    setDescLength(descValue.length);
  };

  const editNote = async () => {
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

      const id = props.noteId;
      const editedNote = {
        title: noteTitle,
        description: noteDesc,
      };

      const token = loggedUserToken;

      await noteService.editNote(id, editedNote, token);

      setStoreEditedNote(true);

      onClose();
    } catch (error) {
      setErrorMessage("Something went wrong, try again");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const deleteCategory = async (categoryToDelete) => {
    const id = props.noteId;
    const token = loggedUserToken;

    const currentCategories = [...props.noteCategories];

    const updatedCategories = currentCategories.filter(
      (category) => category !== categoryToDelete
    );

    const editedNote = {
      categories: updatedCategories,
    };

    await noteService.deleteNoteCategory(id, editedNote, token);

    removeStoreCategory(categoryToDelete);

    onClose();

    setStoreEditedNote(true);
  };

  const addNewCategory = async () => {
    const categoryToAdd = [newCategory];
    const id = props.noteId;
    const token = loggedUserToken;

    const editedNote = {
      categories: categoryToAdd,
    };

    console.log(editedNote);
    await noteService.editNote(id, editedNote, token);

    setStoreCategories(categoryToAdd);

    onClose();

    setStoreEditedNote(true);
  };

  return (
    <>
      <Button
        rightIcon={<CiEdit />}
        colorScheme="blue"
        variant="solid"
        onClick={onOpen}
      >
        Edit Note
      </Button>

      <Modal
        isCentered
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setNoteTitle(props.noteTitle);
          setNoteDesc(props.noteDesc);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                onChange={handleTitleChange}
                value={noteTitle}
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
                onChange={handleDescChange}
                value={noteDesc}
                placeholder="Description"
              />
              <span className="flex justify-end font-thin opacity-50">
                {descLength}/255
              </span>
              <FormLabel>Categories</FormLabel>
              {props.noteCategories.map((category, index) => (
                <Badge
                  key={index}
                  colorScheme="teal"
                  className="mr-1 cursor-pointer"
                  onClick={() => {
                    deleteCategory(category);
                  }}
                >
                  {category}
                  <div className="flex items-center">
                    <span className="font-thin">Delete</span>
                    <TiDelete width={100} height={100} />
                  </div>
                </Badge>
              ))}
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
                  onClick={addNewCategory}
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
            <Button onClick={editNote} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button
              onClick={() => {
                onClose();
                setNoteTitle(props.noteTitle);
                setNoteDesc(props.noteDesc);
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
