import express from "express";
import {test} from '../controllers/userController.js'
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser ,deleteUser , signOut} from "../controllers/userController.js";

const router = express.Router()

router.get('/',test)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/signout',signOut)


export default router
