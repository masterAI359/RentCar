import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";

const expireDate = new Date(Date.now() + 3600000);

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  // i put hashedPassword and newUser in try because if emty value comes the exicution dosenot stop

  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword ,isUser:true });
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
    const { password: hashedPassword, isAdmin, ...rest } = validUser._doc;
    // const expiryDate = new Date(Date.now()  +  3600000) //1 hour
    const responsePayload = { isAdmin,password:hashedPassword, ...rest };

    req.user = { ...rest, isAdmin: validUser.isAdmin ,isUser:validUser.isUser };
    next();

   

    res
      .cookie("access_token", token, { httpOnly: true, maxAge: 3600000 }) //10 hours
      .status(200)
      .json(responsePayload);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).lean();
    if(user && !user.isUser){
      return next(errorHandler(409,'email already in use as a vendor'))
    }
    if (user) {
      const { password: hashedPassword, ...rest } = user;
      const token = Jwt.sign({ id: user._id }, process.env.SECRET_KEY);

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expireDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8); //we are generating a random password since there is no password in result
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        profilePicture: req.body.photo,
        password: hashedPassword,
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        isUser:true,
        //we cannot set username to req.body.name because other user may also have same name so we generate a random value and concat it to name
        //36 in toString(36) means random value from 0-9 and a-z
      });
     const savedUser=  await newUser.save();
     const userObject = savedUser.toObject();
     
      const token = Jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
      const { password: hashedPassword2, ...rest } = userObject;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expireDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};


