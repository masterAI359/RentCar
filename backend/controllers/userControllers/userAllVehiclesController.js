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
    if (!req.body) {
      next(errorHandler(409, "body cannot be empty"));
    }
    const { id } = req.body;
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

//search car filter in homepage
export const searchCar = async (req, res, next) => {
  try {
    if (req && req.body) {
      const {
        pickup_district,
        pickup_location,
        dropoff_location,
        pickuptime,
        dropofftime,
      } = req.body;
      const search = await vehicle.aggregate([
        {
          $match:
           
            {
              isDeleted: "false",
            },
        },
        {
          $match:
           
            {
              district: pickup_district,
              location: pickup_location,
              isBooked: "false",
            },
        },
        {
          $group: {
            _id: {
              model: "$model",
              location: "$location",
              fuel_type: "$fuel_type",
              transmition: "$transmition",
              seats: "$seats",
            },
            vehicles: {
              $push: "$$ROOT",
            },
          },
        },
        {
          $project:
           
            {
              _id: 1,
              vehicles: {
                $cond: {
                  if: {
                    $gt: [
                      {
                        $size: "$vehicles",
                      },
                      1,
                    ],
                  },
                  then: {
                    $arrayElemAt: ["$vehicles", 0],
                  },
                  else: "$vehicles",
                },
              },
            },
        },
        {
          $unwind:
            
            {
              path: "$vehicles",
            },
        },
        {
          $replaceRoot:
           
            {
              newRoot: "$vehicles",
            },
        },
      ]);
      if (search) {
        res.status(200).json(search);
      } else {
        res.status(404).json({ message: "no car found" });
      }
    } else {
      res.status(400).json({ message: "please provide all the details" });
    }
  } catch (error) {
    next(errorHandler(500, "something went wrong while Searching car"));
  }
};
