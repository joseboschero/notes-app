import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

import { Note } from "./Note.js";

export const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Note, {
  foreignKey: "userId",
  sourceKey: "id",
});

Note.belongsTo(User, {
  foreignKey: "userId",
  targetId: "id",
});
