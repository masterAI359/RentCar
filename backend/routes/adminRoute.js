import express from "express"
import { adminAuth ,adminProfiile } from "../controllers/adminControllers/adminController.js"
import { signIn } from "../controllers/authController.js"
import { signOut  } from "../controllers/userControllers/userController.js"

const router = express.Router()

router.post('/dashboard',signIn,adminAuth)
router.post('/profile',adminProfiile)
router.get('/signout',signOut)

export default router