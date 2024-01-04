import { Note } from "../models/Note.js";

import { User } from "../models/User.js";

import jwt from "jsonwebtoken";

export const getNotes = async (req, res) => {
  const { userId } = req;

  try {
    const notes = await Note.findAll({
      where: { userId },
    });

    res.json(notes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  const { title, description, categories } = req.body;

  const { userId } = req;

  try {
    const existingNote = await Note.findOne({
      where: {
        title,
        userId,
      },
    });

    if (existingNote) {
      return res.status(400).json({ message: "Note title already exists" });
    }

    const newNote = Note.create({
      title,
      description,
      categories,
      userId,
    });

    res.status(200).json("Note created successfully");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  const { userId } = req;

  try {
    await Note.destroy({
      where: {
        id,
      },
    });

    res.status(204).json("Note deleted succesfully");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, archived, categories } = req.body;
  const { userId } = req;

  try {
    const note = await Note.findByPk(id);
    note.title = title;
    note.description = description;
    note.archived = archived;

    note.categories = note.categories.concat(categories);

    await note.save();

    res.status(204).json("Note edited succesfully");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeCategory = async (req, res) => {
  const { id } = req.params;
  const { categories } = req.body;
  const { userId } = req;

  try {
    const note = await Note.findByPk(id);

    note.categories = categories;

    await note.save();

    res.status(204).json("Categories edited succesfully");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
