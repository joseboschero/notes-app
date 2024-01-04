import express from "express";

import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(userRoutes);
app.use(noteRoutes);

export default app;
