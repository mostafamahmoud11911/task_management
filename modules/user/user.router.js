import express from "express";
import { login, register } from "./user.controller.js";
import { existUser } from "../../middleware/existUser.js";
import { validate } from "../../middleware/validate.js";
import { loginSchema, registerSchema } from "./user.validation.js";


const userRouter = express.Router();


userRouter.post("/register", validate(registerSchema), existUser, register);
userRouter.post("/login", validate(loginSchema), login);

export default userRouter;
