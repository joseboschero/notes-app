import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Note = sequelize.define(
  "notes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  },
  {
    timestamps: false,
  }
);
