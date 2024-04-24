import mongoose from "mongoose";
import Booking from "../../models/BookingModel.js";
import { errorHandler } from "../../utils/error.js";

export const BookCar = async (req, res, next) => {
  try {
    if (!req.body) {
      next(errorHandler(401, "bad request on body"));
    }
    const {
      vehicleId,
      userId,
      pickupDate,
      dropoffDate,
      pickUpLocation,
      dropOffLocation,
      pickUpDistrict,
    } = req.body;

    const year = 2024;
    const month = 3; // Note: Months are zero-based (0 for January, 1 for February, etc.)
    const date = 23;
    const hour = 12;
    const minute = 30;
    const second = 0;

    const myDate = new Date(year, month, date, hour, minute, second);
    const book = new Booking({
      pickupDate: myDate,
      dropOffDate: myDate,
      userId: userId,
      pickUpLocation: pickUpLocation,
      vehicleId,
      dropOffLocation: dropOffLocation,
      pickUpDistrict: pickUpDistrict,
    });
    if (!book) {
      console.log("not booked");
      return;
    }
    if (book) {
      const booked = await book.save();
      console.log(booked);
      return res.status(200).json({
        message: "car booked successfully",
        booked,
      });
    }
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "error while booking car"));
  }
};

// -----------------------------------

//check vehicle availabilitty
export const checkAvailability = async (req, res, next) => {
  try {
    if (!req.body) {
      next(errorHandler(401, "bad request no body"));
    }
    const { pickupDate, dropOffDate, vehicleId } = req.body;


    if (!pickupDate || !dropOffDate || !vehicleId) {
      console.log("pickup , dropffdate and vehicleId is required");
      next(errorHandler(409, "pickup , dropffdate and vehicleId is required"));
    }

    // Check if pickupDate is before dropOffDate
    if (pickupDate >= dropOffDate) {
      return next(errorHandler(409, "Invalid date range"));
    }

    const sixHoursLater = new Date(dropOffDate);
    sixHoursLater.setTime(sixHoursLater.getTime() + 6 * 60 * 60 * 1000);

    //checking data base  find overlapping pickup and dropoffDates
    const existingBookings = await Booking.find({
      vehicleId,
      $or: [
        { pickupDate: { $lt: dropOffDate }, dropOffDate: { $gt: pickupDate } }, // Overlap condition
        { pickupDate: { $gte: pickupDate, $lt: dropOffDate } }, // Start within range
        { dropOffDate: { $gt: pickupDate, $lte: dropOffDate } }, // End within range
        {
          pickupDate: { $lte: pickupDate },
          dropOffDate: { $gte: dropOffDate },
        }, // Booking includes the entire time range
        {
          pickupDate: { $gte: sixHoursLater },
        }
      ],
    });

    // If there are overlapping bookings, return an error
    if (existingBookings.length > 0) {
      return next(
        errorHandler(
          400,
          "Vehicle is not available for the specified time period"
        )
      );
    }

    // If no overlapping bookings, vehicle is available
    return res
      .status(200)
      .json({ message: "Vehicle is available for booking" });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "error in checkAvailability"));
  }
};
