import mongoose, { mongo } from "mongoose";

const vehicleSchema = new mongoose.Schema({
    registeration_number:{
        type:String,
        required:true,
        unique:true
    },
    company:{
        type:String,
    },
    name:{
        type:String
    }
   
})

const Vehicle = mongoose.model("Vehicle",vehicleSchema)

export default Vehicle