import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs'

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password,10)
  const newUser = new User({ username, email, password:hashedPassword });
  try{
    await newUser.save(); 
    res.status(200).json({ message: "newUser added successfully" });
  }
  catch(err){
    console.error(err)
    res.status(501).json({message:`user not added ${err}`})
  }
 

};

