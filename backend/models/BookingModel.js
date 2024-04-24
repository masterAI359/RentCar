import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  pickupDate: { type: Date, required: true },
  dropOffDate: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional, if needed
  pickUpLocation: { type: String, required: true },
  dropOffLocation: { type: String, required: true },
});

const Booking = mongoose.model("Booking", userSchema);

export default Booking;
