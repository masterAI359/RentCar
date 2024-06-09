import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import { updateUser ,deleteUser , signOut } from "../controllers/userControllers/userController.js";
import { checkAvailability, listAllVehicles, searchCar, showVehicleDetails } from "../controllers/userControllers/userAllVehiclesController.js";
import { editUserProfile } from "../controllers/userControllers/userProfileController.js";
import { BookCar, razorpayOrder, getVehiclesWithoutBooking, filterVehicles, showOneofkind, showAllVariants, findBookingsOfUser, sendBookingDetailsEamil, latestbookings } from "../controllers/userControllers/userBookingController.js";


const router = express.Router()


router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/signout',verifyToken,signOut)
router.get('/listAllVehicles',verifyToken,listAllVehicles)
router.post('/showVehicleDetails',verifyToken,showVehicleDetails)
router.post('/editUserProfile/:id',verifyToken,editUserProfile)
// router.post('/searchCar',searchCar)
// router.post('/checkAvailability',checkAvailability)
router.post('/razorpay',verifyToken,razorpayOrder)
router.post('/bookCar',verifyToken,BookCar)
router.post('/filterVehicles',verifyToken,filterVehicles)
router.post('/getVehiclesWithoutBooking',verifyToken,getVehiclesWithoutBooking,showAllVariants)
router.post('/showSingleofSameModel',getVehiclesWithoutBooking,showOneofkind)
router.post('/findBookingsOfUser',verifyToken,findBookingsOfUser)
router.post('/latestbookings',latestbookings)
router.post('/sendBookingDetailsEamil',sendBookingDetailsEamil)









export default router
