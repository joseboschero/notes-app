import { User } from "../models/User.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (user === null) {
      return res.status(401).json({ message: "Invalid user or password" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return res.status(401).json({ message: "Invalid user or password" });
    }

    const userForToken = {
      id: user.id,
      username: user.username,
    };

    const secretWord = process.env.SECRET_WORD || "defaultsecretword";
    const token = jwt.sign(userForToken, secretWord, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(200).json({ username: user.username, userId: user.id, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
