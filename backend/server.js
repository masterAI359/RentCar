import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/userRoute.js";

const App = express();
dotenv.config();
const port  = 3000

mongoose
  .connect(process.env.mongo_uri)
  .then(console.log("connected"))
  .catch((error) => console.error(error));

App.listen(port, () => {
  console.log("server listening !");
});

App.use('/api/user',router)
