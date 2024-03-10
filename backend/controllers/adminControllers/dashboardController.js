import { errorHandler } from "../../utils/error.js";
import vehicle from "../../models/vehicleModel.js";
import Vehicle from "../../models/vehicleModel.js";

export const addProduct = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data) {
      return next(errorHandler(404, "no data"));
    }

    const addProduct = new vehicle(data);

    await addProduct.save();

    res
      .status(201)
      .json({ message: "product added succesfly", product: addProduct });
  } catch (error) {
    next(errorHandler(400, "could not add "), console.log(error));
  }
};

export const showVehicles = async (req, res, next) => {
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

export const deleteVehicle = async (req, res, next) => {
  try {
    const vehicle_id = req.params.id;
    if (!vehicle_id) {
      return;
    }

    const deleted = await Vehicle.findByIdAndDelete(vehicle_id);
    if (!deleted) {
      return next(500, "not able to delete");
    }
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    next(errorHandler(500, "something went wrong"));
  }
};
