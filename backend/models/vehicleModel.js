import mongoose, { mongo } from "mongoose";

const vehicleSchema = new mongoose.Schema({
  registeration_number: {
    type: String,
    required: true,
    unique: true,
  },
  car_title:{
    type:String,
    required:false
  },
  car_description:{
    type:String,
    required:false
  },
  created_at:{
    type:String,
    required:false
  },
  updated_at:{
    type:String,
    required:false
  },
  remark:{
    type:String,
    required:false
  },
  company: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  model: {
    type: String,
    required: false,
  },
  year_made: {
    type: Number,
    required: false,
  },
  fuel_type: {
    type: String,
    enum:["petrol", "disel", "electirc"],
    required:false
  },
  rented_by: {
    type: String,
    required: false,
  },
  rating: {
    type: ["1", "2", "3", "4", "5"],
    requrired:false,
  },
  seats: {
    type: Number,
    required: false,
  },
  transmition: {
    type: ["manual", "automatic"],
    required:false,
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  base_package: {
    type: String,
    required: false,
  },
  with_or_without_fuel: {
    type: Boolean,
    required: false,
  },
  insurance_end: {
    type: Date,
    required: false,
  },
  registeration_end: {
    type: Date,
    required: false,
  },
  pollution_end: {
    type: Date,
    required: false,
  },
  certificates: {
    fitness: {
      type: String,
      required: false,
    },
    registration: {
      type: String,
      required: false,
    },
    rc: {
      type: String,
      required: false,
    },
    pollution: {
      type: String,
      required: false,
    },
  },
  car_type: {
    type: ["sedan", "hatchback", "suv", "jeep"],
    required: false,
  },

});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
