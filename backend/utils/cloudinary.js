import {v2 as cloudinary} from 'cloudinary';
import { errorHandler } from './error.js';

import dotenv from 'dotenv';
dotenv.config();
          
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });


  const opts = {
    overwrite : true,
    invalidate:true,
    resource_type:"auto"
  }

  //uploading image to cloudinary and returning the url from cloudinary
  export const uploadImage = async (image)=> {
    try{
      const result = await cloudinary.uploader.upload(image, opts)
      if (result && result.secure_url) {
        // console.log(result.secure_url);
        return result.secure_url;
      } else {
        console.log("Error uploading image");
        throw new Error("Error uploading image");
      }
    }
    catch(error) {
      console.log(error)
      next(errorHandler('501','uploading image failed'))
    };

  }

export default cloudinary

