import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  // i put hashedPassword and newUser in try because if emty value comes the exicution dosenot stop

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(200).json({ message: "newUser added successfully" });
  } catch (error) {
    next(error);
  }
};
