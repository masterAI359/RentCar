import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";

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

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "user not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));
    const token = Jwt.sign({ id: validUser._id }, process.env.SECRET_KEY);
    const { password: hashedPassword, ...rest } = validUser._doc;
    // const expiryDate = new Date(Date.now()  +  3600000) //1 hour
    res
      .cookie("access_token", token, { httpOnly: true, maxAge: 36000000 }) //10 hours
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
