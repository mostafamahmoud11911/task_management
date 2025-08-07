import User from "../database/models/user.model.js";

export const existUser = async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }
  next();
};
