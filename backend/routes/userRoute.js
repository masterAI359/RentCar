import express from "express";
import {test} from '../controllers/userController.js'
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser } from "../controllers/userController.js";

const router = express.Router()

router.get('/',test)
router.post('/update/:id',verifyToken,updateUser)

export default router
