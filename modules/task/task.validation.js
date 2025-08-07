import Joi from "joi";

export const addTaskSchema = Joi.object({
  title: Joi.string().min(5).max(50).required(),
  description: Joi.string().min(1).max(200).required(),
  due_date: Joi.date().optional(),
  status: Joi.string().valid("Pending", "In-Progress", "Completed").required(),
});

export const updateTaskSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  title: Joi.string().min(5).max(50).optional(),
  description: Joi.string().min(1).max(200).optional(),
  due_date: Joi.date().optional(),
  status: Joi.string().valid("Pending", "In-Progress", "Completed").optional(),
});

export const paramsSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
