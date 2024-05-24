import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import User from "../models/userModel.js";
import { refreshToken } from "../controllers/authController.js";

export const verifyToken = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (!accessToken) {
    if (!refreshToken){
      res.clearCookie('access_token',"refresh_token")
      return next(errorHandler(401, "You are not authenticated"));
    }
     

    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
      const user = await User.findById(decoded.id);

      if (!user) return next(errorHandler(403, "Invalid refresh token"));
      if (user.refreshToken !== refreshToken)
        return next(errorHandler(403, "Invalid refresh token"));

      const newAccessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN,
        { expiresIn: "15m" }
      );
      const newRefreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN,
        { expiresIn: "7d" }
      );

      // Update the refresh token in the database for the user
      await User.updateOne(
        { _id: user._id },
        { refreshToken: newRefreshToken }
      );

      res
        .cookie("access_token", newAccessToken, {
          httpOnly: true,
          maxAge: 900000,
        }) // 15 minutes
        .cookie("refresh_token", newRefreshToken, {
          httpOnly: true,
          maxAge: 604800000,
        }); // 7 days

      req.user = decoded.id; //setting req.user so that next middleware in this cycle can acess it
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  } else {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
      req.user = decoded.id; //setting req.user so that next middleware in this cycle can acess it
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        // Access token expired, try to refresh it
        // ... (code to refresh the access token using the refresh token)
      } else {
        next(errorHandler(403, "Token is not valid"));
      }
    }
  }
};
