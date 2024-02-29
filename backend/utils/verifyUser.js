import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) next(errorHandler(401,"you are not authenticated"));

  jwt.verify(token,process.env.SECRET_KEY,(err,user)=> {
    if(err) return next(errorHandler(403,"Token is not valid"))

    
    req.user = user
    next()
  });
};
