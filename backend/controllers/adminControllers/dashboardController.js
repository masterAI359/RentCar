import { errorHandler } from "../../utils/error.js";
import vehicle from "../../models/vehicleModel.js";
import Vehicle from "../../models/vehicleModel.js";

import { uploader } from "../../utils/cloudinaryConfig.js";
import { dataUri } from "../../utils/multer.js";

//admin addVehicle
export const addProduct = async (req, res, next) => {
  try {
    if (!req.body) {
      return next(errorHandler(500, "body cannot be empty"));
    }
    if(!req.file){
      return next(errorHandler(500,"image cannot be empty"))
    }

    const { registeration_number, company, name } = req.body;

    if (req.file) {
      
      //converting the buffer to base64
      const fileDataUri = dataUri(req);

      try {
        const result = await uploader.upload(fileDataUri.result.content, {
          public_id: fileDataUri.name,
        });

        try {
          if (result && result.secure_url) {
            const addVehicle = new vehicle({
              registeration_number,
              company,
              name,
              image: result.secure_url,
            });

            await addVehicle.save();
            res.status(200).json({
              message: "product added to mb & cloudninary successfully",
            });
          } else {
            throw new Error(
              "failed upload to  cloudinary check in dashboardController addProduct"
            );
          }
        } catch (error) {
          if (error.code === 11000)
            return next(errorHandler(409, "product already exists"));
          next(errorHandler(500, "product not uploaded"));
        }
      } catch (error) {
        next(errorHandler(500, "could not upload image to cloudinary"));
      }
    }
  } catch (error) {
    next(errorHandler(400, "vehicle failed to add "), console.log(error));
  }
};

//show all vehicles to admin
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



//admin delete vehicle

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



//edit vehicle listed by admin

export const editVehicle = async (req, res, next) => {
  try {
    //get the id of vehicle to edit through req.params
    const vehicle_id = req.params.id;

    if (!vehicle_id) {
      return next(errorHandler(401, "cannot be empty"));
    }

    if (!req.body || !req.body.formData) {
      return next(errorHandler(404, "Add data to edit first"));
    }

    const { registeration_number, company, name } = req.body.formData;

    try {
      const edited = await Vehicle.findByIdAndUpdate(
        vehicle_id,
        { registeration_number, company, name },
        { new: true }
      );
      if (!edited) {
        return next(errorHandler(404, "data with this id not found"));
      }

      res.status(200).json(edited);
    } catch (error) {
      if (error.code == 11000 && error.keyPattern && error.keyValue) {
        const duplicateField = Object.keys(error.keyPattern)[0];
        const duplicateValue = error.keyValue[duplicateField];

        return next(
          errorHandler(
            409,
            `${duplicateField} '${duplicateValue}' already exists`
          )
        );
      }
    }
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "something went wrong"));
  }
};
