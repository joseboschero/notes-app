import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Heading,
  CardFooter,
  Button,
  Badge,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { IoTrashBin } from "react-icons/io5";
import { RiInboxArchiveFill } from "react-icons/ri";
import { RiInboxUnarchiveFill } from "react-icons/ri";

import NoteEditModal from "./NoteEditModal";

import notesService from "../services/notes";

import useStore from "../store/store";

import { useNavigate } from "react-router-dom";

export default function NoteCard(props) {
  const {
    loggedUserToken,
    newNoteCreated,
    setNewNoteCreated,
    storeEditedNote,
    setStoreEditedNote,
    setStoreNoteDeleted,
    storeNoteDeleted,
  } = useStore();

  const navigate = useNavigate();

  const [userNotes, setUserNotes] = useState();

  const getNotes = async () => {
    const notes = await notesService.getAllNotes(loggedUserToken);

    setUserNotes(notes);
  };

  const deleteNote = async (id, token) => {
    await notesService.deleteNote(id, token);

    setStoreNoteDeleted(true);

    getNotes();

    navigate("/notes");
  };

  const archiveNote = async (id) => {
    const editedNote = {
      archived: true,
    };

    const token = loggedUserToken;

    await notesService.editNote(id, editedNote, token);

    setStoreEditedNote(true);
  };

  const unarchiveNote = async (id) => {
    const editedNote = {
      archived: false,
    };

    const token = loggedUserToken;

    await notesService.editNote(id, editedNote, token);

    setStoreEditedNote(true);
  };

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    getNotes();
    setNewNoteCreated(false);
  }, [newNoteCreated]);

  useEffect(() => {
    getNotes();
    setStoreEditedNote(false);
  }, [storeEditedNote]);

  return (
    <Card>
      <CardHeader>
        <Heading size="md">{props.title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{props.description}</Text>
        {props.categories.map((category, index) => (
          <Badge key={index} colorScheme="teal" className="mr-1">
            {category}
          </Badge>
        ))}
      </CardBody>
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <CardFooter>
          <div className="flex gap-4">
            <NoteEditModal
              noteTitle={props.title}
              noteDesc={props.description}
              noteId={props.id}
              noteCategories={props.categories}
            />
            <Button
              rightIcon={<IoTrashBin />}
              onClick={() => deleteNote(props.id, loggedUserToken)}
              bgColor="#EA4C46"
              _hover={{ bgColor: "#F07470" }}
            >
              Delete note
            </Button>
          </div>
        </CardFooter>
        <div className="my-4 md:mx-4">
          <Button
            onClick={() => {
              if (props.archived) {
                unarchiveNote(props.id);
              } else {
                archiveNote(props.id);
              }
            }}
            rightIcon={
              props.archived ? <RiInboxUnarchiveFill /> : <RiInboxArchiveFill />
            }
          >
            {props.archived ? "Unarchive" : "Archive"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
