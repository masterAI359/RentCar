
import {  vendorGoogle, vendorSignin, vendorSignout, vendorSignup } from "../controllers/vendorControllers/vendorController.js"
import express from "express"
import { multerMultipleUploads } from "../utils/multer.js"
import { showVendorVehicles, vendorAddVehicle, vendorDeleteVehicles, vendorEditVehicles } from "../controllers/vendorControllers/vendorCrudController.js"

const router = express.Router()

router.post('/vendorsignup',vendorSignup)
router.post('/vendorsignin',vendorSignin)
router.get('/vendorsignout',vendorSignout)
router.post('/vendorgoogle',vendorGoogle)
router.post('/vendorAddVehicle',multerMultipleUploads,vendorAddVehicle)
router.post('/showVendorVehilces',showVendorVehicles)
router.put('/vendorEditVehicles/:id',vendorEditVehicles)
router.delete('/vendorDeleteVehicles/:id',vendorDeleteVehicles)



export default router