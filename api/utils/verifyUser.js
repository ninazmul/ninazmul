import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(errorHandler(401, "Unauthorized"));
    }

    req.user = {
      id: user._id,
      isAdmin: user.isAdmin,
      ...user._doc,
    };

    next();
  } catch (error) {
    return next(errorHandler(401, "Unauthorized"));
  }
};
