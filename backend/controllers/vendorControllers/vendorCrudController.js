import { errorHandler } from "../../utils/error.js";
import vehicle from "../../models/vehicleModel.js";

import { uploader } from "../../utils/cloudinaryConfig.js";
import { base64Converter } from "../../utils/multer.js";


// vendor add vehicle
export const vendorAddVehicle = async (req, res, next) => {
  try {
    if (!req.body) {
      return next(errorHandler(500, "body cannot be empty"));
    }
    if (!req.files || req.files.length === 0) {
      return next(errorHandler(500, "image cannot be empty"));
    }

    const {
      registeration_number,
      company,
      name,
      model,
      title,
      base_package,
      price,
      year_made,
      fuel_type,
      description,
      seat,
      transmition_type,
      registeration_end_date,
      insurance_end_date,
      polution_end_date,
      car_type,
      location,
      district,
      addedBy,
    } = req.body;

    const uploadedImages = [];

    if (req.files) {
      //converting the buffer to base64
      const encodedFiles = base64Converter(req);

      try {
        //mapping over encoded files and uploading to cloudinary
        await Promise.all(
          encodedFiles.map(async (cur) => {
            try {
              const result = await uploader.upload(cur.data, {
                public_id: cur.filename,
              });
              uploadedImages.push(result.secure_url);
            } catch (error) {
              console.log(error, {
                message: "error while uploading to cloudinary",
              });
            }
          })
        );
        try {
          if (uploadedImages.length > 0) {
            const addVehicle = new vehicle({
              registeration_number,
              company,
              name,
              image: uploadedImages,
              model,
              car_title: title,
              car_description: description,
              base_package,
              price,
              year_made,
              fuel_type,
              seats: seat,
              transmition: transmition_type,
              insurance_end: insurance_end_date,
              registeration_end: registeration_end_date,
              pollution_end: polution_end_date,
              car_type,
              created_at: Date.now(),
              location,
              district,
              isAdminAdded: "false",
              addedBy:addedBy,
              adminAproved:false
            });

            await addVehicle.save();
            res.status(200).json({
              message: "product added to mb & cloudninary successfully",
            });
          }
        } catch (error) {
          if (error.code === 11000) {
            return next(errorHandler(409, "product already exists"));
          }

          console.log(error);
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




//show vendor vehicles

export const showVendorVehicles = async (req,res,next) => {
  try {
    if (!req.body) {
      throw errorHandler(400, "User not found");
    }
  
    const { _id } = req.body;
  
    const vendorsVehicles = await vehicle.aggregate([
      {
        $match: {
          isDeleted: "false",
          isAdminAdded: false,
          addedBy: _id
        },
      },
    ]);
  
    if (!vendorsVehicles || vendorsVehicles.length === 0) {
      throw errorHandler(400, "No vehicles found");
    }
  
    res.status(200).json(vendorsVehicles);
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Error in showVendorVehicles"));
  }
  
}