import { Router } from "express";

import {
  getUser,
  getUsers,
  createUser,
  loginUser,
} from "../controllers/UserController.js";

const router = Router();

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.post("/users", createUser);

router.post("/users/login", loginUser);

export default router;
