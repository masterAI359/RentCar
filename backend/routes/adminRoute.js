import express from "express"
import { adminAuth ,adminProfiile } from "../controllers/adminController.js"
import { signIn } from "../controllers/authController.js"

const router = express.Router()

router.post('/dashboard',signIn,adminAuth)
router.post('/profile',adminProfiile)

export default router