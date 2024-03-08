
import {  vendorGoogle, vendorSignin, vendorSignout, vendorSignup } from "../controllers/vendorControllers/vendorController.js"
import express from "express"

const router = express.Router()

router.post('/vendorsignup',vendorSignup)
router.post('/vendorsignin',vendorSignin)
router.get('/vendorsignout',vendorSignout)
router.post('/vendorgoogle',vendorGoogle)


export default router