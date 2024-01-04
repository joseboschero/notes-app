import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAllNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(baseUrl, config);

  return data;
};

const categoryFilteredNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(baseUrl, config);

  return data;
};

const createNote = async (newNote, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(baseUrl, newNote, config);

  return data;
};

const deleteNote = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

const editNote = async (id, editedNote, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.put(`${baseUrl}/${id}`, editedNote, config);
};

const deleteNoteCategory = async (id, editedNote, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.put(`${baseUrl}/${id}/removecategory`, editedNote, config);
};

export default {
  getAllNotes,
  createNote,
  deleteNote,
  editNote,
  deleteNoteCategory,
  categoryFilteredNotes,
};
