import { useEffect, useState } from "react";

import NoteCard from "./NoteCard";

import notesService from "../services/notes";

import useStore from "../store/store";

export default function NotesHolder() {
  const {
    loggedUserToken,
    newNoteCreated,
    setNewNoteCreated,
    storeEditedNote,
    setStoreEditedNote,
    storeRadioValue,
    storeFilteredNotes,
    storeNoteDeleted,
    setStoreNoteDeleted,
  } = useStore();

  const [userNotes, setUserNotes] = useState();

  const getNotes = async () => {
    const notes = await notesService.getAllNotes(loggedUserToken);

    setUserNotes(notes);
  };

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (storeFilteredNotes.length == 0) {
      getNotes();
    }
    setUserNotes(storeFilteredNotes);
  }, [storeFilteredNotes]);

  useEffect(() => {
    getNotes();
    setNewNoteCreated(false);
  }, [newNoteCreated]);

  useEffect(() => {
    getNotes();
    setStoreEditedNote(false);
  }, [storeEditedNote]);

  useEffect(() => {
    getNotes();
    setStoreNoteDeleted(false);
  }, [storeNoteDeleted]);

  const notesHasElements = userNotes && Object.keys(userNotes).length > 0;

  return (
    <div className="mt-24 mb-10 mx-4 w-screen flex flex-col md:flex-row gap-8 md:flex-wrap md:justify-around md:items-center">
      {storeRadioValue == 1 && notesHasElements ? (
        userNotes.map((note) => (
          <div className="w-[95%] md:w-[40%]" key={note.id}>
            <NoteCard
              id={note.id}
              title={note.title}
              description={note.description}
              archived={note.archived}
              categories={note.categories}
            />
          </div>
        ))
      ) : storeRadioValue == 2 && notesHasElements ? (
        userNotes
          .filter((note) => !note.archived)
          .map((note) => (
            <div className="w-[95%] md:w-[40%]" key={note.id}>
              <NoteCard
                id={note.id}
                title={note.title}
                description={note.description}
                archived={note.archived}
                categories={note.categories}
              />
            </div>
          ))
      ) : storeRadioValue == 3 && notesHasElements ? (
        userNotes
          .filter((note) => note.archived)
          .map((note) => (
            <div className="w-[95%] md:w-[40%]" key={note.id}>
              <NoteCard
                id={note.id}
                title={note.title}
                description={note.description}
                archived={note.archived}
                categories={note.categories}
              />
            </div>
          ))
      ) : (
        <h1>You don't have notes yet, create the first one!</h1>
      )}
    </div>
  );
}
