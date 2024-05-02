import Booking from "../models/BookingModel.js";
import Vehicle from "../models/vehicleModel.js";


//returning vehicles that are not booked in selected Date
export async function availableAtDate(pickupDate, dropOffDate) {
    try {
      const existingBookings = await Booking.find({
        $or: [
          { pickupDate: { $lt: dropOffDate }, dropOffDate: { $gt: pickupDate } }, // Overlap condition
          { pickupDate: { $gte: pickupDate, $lt: dropOffDate } }, // Start within range
          { dropOffDate: { $gt: pickupDate, $lte: dropOffDate } }, // End within range
          { pickupDate: { $lte: pickupDate }, dropOffDate: { $gte: dropOffDate } }, // Booking includes the entire time range
        ],
      });
  
      const vehicleIds = existingBookings.map(booking => booking.vehicleId);
      const uniqueVehicleIds = [...new Set(vehicleIds)];
      
      const vehiclesWithoutBookings = await Vehicle.find({ _id: { $nin: uniqueVehicleIds } });
      return vehiclesWithoutBookings || [];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }