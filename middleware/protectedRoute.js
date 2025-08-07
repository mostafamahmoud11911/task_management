import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const protectedRoute = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return next(new AppError("Token not found", 401));
  }

  token = token.split(" ")[1];
  // verify token with secret key and get user
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(new AppError(err.message, 401));
    }
    req.user = user;
    next();
  });
};
export default protectedRoute;
