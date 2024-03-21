import vehicle from "../../models/vehicleModel.js";
import { errorHandler } from "../../utils/error.js";

//show all vehicles to user
export const listAllVehicles = async (req, res, next) => {
    try {
      const vehicles = await vehicle.find();
      
      if (!vehicles) {
        return next(errorHandler(404, "no vehicles found"));
      }
      res.status(200).json(vehicles);
    } catch (error) {
      console.log(error);
      next(errorHandler(500, "something went wrong"));
    }
  };

  //show one vehicle Detail to user
  export const showVehicleDetails = async (req, res, next) => {
    try {
      if(!req.body){
        next(errorHandler(409,'body cannot be empty'))
      }
      const {id} = req.body
      const vehicleDetail = await vehicle.findById(id);
      
      if (!vehicleDetail) {
        return next(errorHandler(404, "no vehicles found"));
      }
  
      res.status(200).json(vehicleDetail);
    } catch (error) {
      console.log(error);
      next(errorHandler(500, "something went wrong"));
    }
  };