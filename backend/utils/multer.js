import multer from "multer";
import path from "path";
import DatauriParser from 'datauri/parser.js'

const storage = multer.memoryStorage();
export const multerUploads = multer({ storage }).single("image");

const parser = new DatauriParser()

export const dataUri = (req)=> {
  if(req.file){
    const buffer = req.file.buffer
    const name = req.file.originalname.split(' ').join('_')
    const result = parser.format(req.file.mimetype,buffer)
    return {result,name}
  }
  else{
    throw new Error("no file found in the request error in multer.js file")
  }
  
    
}



