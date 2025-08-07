import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(50).required(),
});



export const loginSchema = Joi.object({
  email: Joi.string().email().required("Email is required"),
  password: Joi.string().required("Password is required"),
});
