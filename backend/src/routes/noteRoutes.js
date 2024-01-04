import { Router } from "express";

import userExtractor from "../middleware/userExtractor.js";

import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
  removeCategory,
} from "../controllers/NoteController.js";

const router = Router();

router.get("/notes", userExtractor, getNotes);
router.post("/notes", userExtractor, createNote);
router.delete("/notes/:id", userExtractor, deleteNote);
router.put("/notes/:id", userExtractor, updateNote);
router.put("/notes/:id/removecategory", userExtractor, removeCategory);

export default router;
