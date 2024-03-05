import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";


const expireDate = new Date(Date.now() + 3600000);

export const vendorSignup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const hadshedPassword = bcryptjs.hashSync(password, 10);
    const user = await User.create({
      username,
      password: hadshedPassword,
      email,
      isVendor: true,
    });
    await user.save();
    res.status(200).json({ message: "vendor created successfully" });
  } catch (error) {
    next(error);
  }
};

export const vendorSignin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validVendor = await User.findOne({ email }).lean();
    if (!validVendor || !validVendor.isVendor) {
      return next(errorHandler(404,"user not found"))
    }
    const validPassword = bcryptjs.compareSync(password, validVendor.password);
    if (!validPassword) {
      return next(errorHandler(404,"wrong credentials"));
    }
   
    const token = Jwt.sign({ id: validVendor._id }, process.env.SECRET_KEY);
    const { password: hadshedPassword, ...rest } = validVendor;
    const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: thirtyDaysInMilliseconds,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const vendorSignout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "vendor signedout successfully" });
  } catch (error) {
    next(error);
  }
};


