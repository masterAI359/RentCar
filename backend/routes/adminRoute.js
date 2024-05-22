import express from "express"
import { adminAuth ,adminProfiile } from "../controllers/adminControllers/adminController.js"
import { signIn } from "../controllers/authController.js"
import { signOut  } from "../controllers/userControllers/userController.js"
import { addProduct, deleteVehicle, editVehicle,  } from "../controllers/adminControllers/dashboardController.js"
import { showVehicles } from "../controllers/adminControllers/dashboardController.js"
import { multerUploads } from "../utils/multer.js"
import { insertDummyData } from "../controllers/adminControllers/masterCollectionController.js"
import { getCarModelData } from "../controllers/adminControllers/masterCollectionController.js"
import { approveVendorVehicleRequest, fetchVendorVehilceRequests, rejectVendorVehicleRequest } from "../controllers/adminControllers/vendorVehilceRequests.js"
import { allBookings, changeStatus } from "../controllers/adminControllers/bookingsController.js"
import { verifyToken } from "../utils/verifyUser.js"





const router = express.Router()

router.post('/dashboard',signIn,adminAuth)
router.post('/profile',verifyToken,adminProfiile)
router.get('/signout',verifyToken,signOut)
router.post('/addProduct',verifyToken,multerUploads,addProduct)
router.get('/showVehicles',verifyToken,showVehicles)
router.delete('/deleteVehicle/:id',verifyToken,deleteVehicle)
router.put('/editVehicle/:id',verifyToken,editVehicle)
router.get('/dummyData',verifyToken,insertDummyData)
router.get('/getVehicleModels',getCarModelData)
router.get('/fetchVendorVehilceRequests',verifyToken,fetchVendorVehilceRequests)
router.post('/approveVendorVehicleRequest',verifyToken,approveVendorVehicleRequest)
router.post('/rejectVendorVehicleRequest',verifyToken,rejectVendorVehicleRequest)
router.get('/allBookings',verifyToken,allBookings)
router.post('/changeStatus',verifyToken,changeStatus)

export default router