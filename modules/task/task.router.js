import express from "express";
import protectedRoute from "../../middleware/protectedRoute.js";
import {
  addTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "./task.controller.js";
import { validate } from "../../middleware/validate.js";
import {
  addTaskSchema,
  paramsSchema,
  updateTaskSchema,
} from "./task.validation.js";

const taskRouter = express.Router();

taskRouter.get("/tasks", getAllTasks);
taskRouter.post("/tasks", validate(addTaskSchema), protectedRoute, addTask);
taskRouter.get("/tasks/:id", validate(paramsSchema), getTask);
taskRouter.put(
  "/tasks/:id",
  validate(updateTaskSchema),
  protectedRoute,
  updateTask
);
taskRouter.delete(
  "/tasks/:id",
  validate(paramsSchema),
  protectedRoute,
  deleteTask
);

export default taskRouter;
