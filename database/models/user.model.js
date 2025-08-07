import { DataTypes } from "sequelize";
import sequelize from "../dbConnection.js";
import taskModel from "./task.model.js";

const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: false,
  }
);


User.hasMany(taskModel, { onDelete: "cascade", onUpdate: "cascade" });
taskModel.belongsTo(User);

export default User;
