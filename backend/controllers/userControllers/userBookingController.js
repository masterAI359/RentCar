import mongoose from "mongoose";
import Booking from "../../models/BookingModel.js";
import { errorHandler } from "../../utils/error.js";
import Razorpay from "razorpay";

export const BookCar = async (req, res, next) => {
  try {
    if (!req.body) {
      next(errorHandler(401, "bad request on body"));
    }

    const {
      user_id,
      vehicle_id,
      totalPrice,
      pickupDate,
      dropoffDate,
      pickup_location,
      dropoff_location,
      pickup_district,
      razorpayPaymentId,
      razorpayOrderId
    } = req.body;

    const book = new Booking({
      pickupDate,
      dropOffDate: dropoffDate,
      userId: user_id,
      pickUpLocation: pickup_location,
      vehicleId: vehicle_id,
      dropOffLocation: dropoff_location,
      pickUpDistrict: pickup_district,
      totalPrice,
      razorpayPaymentId,
      razorpayOrderId,
      status: "booked",
    });
    if (!book) {
      console.log("not booked");
      return;
    }
    
      const booked = await book.save();
      res.status(200).json({
        message: "car booked successfully",
        booked,
      });
   
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
        },
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

// ---------------------

//createing razorpay instance
export const razorpayOrder = async (req, res, next) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const { totalPrice } = req.body;

    const options = {
      amount: totalPrice * 100, // amount in smallest currency unit
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "error occured in razorpayorder"));
  }
};
