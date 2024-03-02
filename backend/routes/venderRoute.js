import { vendorSignin, vendorSignup } from "../controllers/vendorController.js"
import express from "express"

const router = express.Router()

router.post('/vendorsignup',vendorSignup)
router.post('/vendorsignin',vendorSignin)

export default router