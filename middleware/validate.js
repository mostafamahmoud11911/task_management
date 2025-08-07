import AppError from "../utils/AppError.js";

export const validate = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(
      { ...req.body, ...req.params, ...req.query },
      { abortEarly: false }
    );
    if (!error) {
      next();
    } else {
      let errMsgs = error.details.map((err) => err.message);
      return next(new AppError(errMsgs, 400));
    }
  };
};
