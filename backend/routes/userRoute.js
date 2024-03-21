import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import { updateUser ,deleteUser , signOut , test} from "../controllers/userControllers/userController.js";
import { listAllVehicles, showVehicleDetails } from "../controllers/userControllers/userAllVehiclesController.js";

const router = express.Router()

router.get('/',test)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/signout',signOut)
router.get('/listAllVehicles',listAllVehicles)
router.post('/showVehicleDetails',showVehicleDetails)




export default router
