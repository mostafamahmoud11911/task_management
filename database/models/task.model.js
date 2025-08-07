import { DataTypes } from "sequelize";
import sequelize from "../dbConnection.js";

const taskModel = sequelize.define(
  "task",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Pending", "In-Progress", "Completed"),
      allowNull: false,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: false,
  }
);


export default taskModel;
