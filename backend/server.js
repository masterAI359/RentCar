import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from './routes/authRoute.js'

const App = express();

App.use(express.json())

dotenv.config();
const port  = 3000

mongoose
  .connect(process.env.mongo_uri)
  .then(console.log("connected"))
  .catch((error) => console.error(error));

App.listen(port, () => {
  console.log("server listening !");
});

App.use('/api/user',userRoute)
App.use('/api/auth',authRoute)
