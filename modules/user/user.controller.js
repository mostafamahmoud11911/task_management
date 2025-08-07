import User from "../../database/models/user.model.js";
import bcrypt from "bcrypt";
import catchError from "../../middleware/catchError.js";
import AppError from "../../utils/AppError.js";
import jwt from "jsonwebtoken";

export const register = catchError(async (req, res, next) => {
  // hash password before creating user
  const hashPassword = await bcrypt.hash(req.body.password, 8);

  req.body.password = hashPassword;

  const user = await User.create(req.body);

  res.status(201).json({ message: "User created successfully", user });
});

export const login = catchError(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  // compare password with hashed password in database
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }
  // create token with user id
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({ message: "Login successful", token });
});
