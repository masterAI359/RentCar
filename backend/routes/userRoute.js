import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import { updateUser ,deleteUser , signOut , test} from "../controllers/userControllers/userController.js";
import { checkAvailability, listAllVehicles, searchCar, showVehicleDetails } from "../controllers/userControllers/userAllVehiclesController.js";
import { editUserProfile } from "../controllers/userControllers/userProfileController.js";
import { BookCar, razorpayOrder, getVehiclesWithoutBooking, filterVehicles, showOneofkind, showAllVariants, findBookingsOfUser } from "../controllers/userControllers/userBookingController.js";


const router = express.Router()

router.get('/',test)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/signout',signOut)
router.get('/listAllVehicles',listAllVehicles)
router.post('/showVehicleDetails',showVehicleDetails)
router.post('/editUserProfile/:id',editUserProfile)
// router.post('/searchCar',searchCar)
// router.post('/checkAvailability',checkAvailability)
router.post('/razorpay',razorpayOrder)
router.post('/bookCar',BookCar)
router.post('/filterVehicles',filterVehicles)
router.post('/getVehiclesWithoutBooking',getVehiclesWithoutBooking,showAllVariants)
router.post('/showSingleofSameModel',getVehiclesWithoutBooking,showOneofkind)
router.post('/findBookingsOfUser',findBookingsOfUser)








export default router
