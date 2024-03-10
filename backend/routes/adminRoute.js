import express from "express"
import { adminAuth ,adminProfiile } from "../controllers/adminControllers/adminController.js"
import { signIn } from "../controllers/authController.js"
import { signOut  } from "../controllers/userControllers/userController.js"
import { addProduct, deleteVehicle } from "../controllers/adminControllers/dashboardController.js"
import { showVehicles } from "../controllers/adminControllers/dashboardController.js"


const router = express.Router()

router.post('/dashboard',signIn,adminAuth)
router.post('/profile',adminProfiile)
router.get('/signout',signOut)
router.post('/addProduct',addProduct)
router.get('/showVehicles',showVehicles)
router.delete('/deleteVehicle/:id',deleteVehicle)

export default router