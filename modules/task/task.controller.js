import taskModel from "../../database/models/task.model.js";
import User from "../../database/models/user.model.js";
import catchError from "../../middleware/catchError.js";
import AppError from "../../utils/AppError.js";

export const getAllTasks = catchError(async (req, res, next) => {

  // get all tasks with user details and exclude password
  const tasks = await taskModel.findAll({
    include: {
      model: User,
      attributes: {
        exclude: ["password"],
      },
    },
  });
  res.status(200).json({ message: "Tasks fetched successfully", tasks });
});

export const addTask = catchError(async (req, res, next) => {
  // create task with user id
  const task = await taskModel.create({ ...req.body, userId: req.user.id });
  res.status(201).json({ message: "Task created successfully", task });
});

export const getTask = catchError(async (req, res, next) => {
  // get task with user details and exclude password
  const task = await taskModel.findByPk(req.params.id, {
    include: {
      model: User,
      attributes: {
        exclude: ["password"],
      },
    },
  });
  // if task exists return it else return error
  !task || res.status(200).json({ message: "Task fetched successfully", task });
  task || next(new AppError("Task not found", 404));
});

export const updateTask = catchError(async (req, res, next) => {

  const [updated] = await taskModel.update(req.body, {
    where: { id: req.params.id },
  });

  !updated || res.status(200).json({ message: "Task updated successfully" });

  updated || next(new AppError("Task not found", 404));
});

export const deleteTask = catchError(async (req, res, next) => {
  const task = await taskModel.destroy({ where: { id: req.params.id } });

  !task || res.status(200).json({ message: "Task deleted successfully" });
  task || next(new AppError("Task not found", 404));
});
