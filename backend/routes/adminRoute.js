import express from "express"
import { adminAuth ,adminProfiile } from "../controllers/adminController.js"
import { signIn } from "../controllers/authController.js"
import { signOut  } from "../controllers/userController.js"

const router = express.Router()

router.post('/dashboard',signIn,adminAuth)
router.post('/profile',adminProfiile)
router.get('/signout',signOut)

export default router