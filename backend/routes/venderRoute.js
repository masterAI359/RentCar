
import {  vendorSignin, vendorSignout, vendorSignup } from "../controllers/vendorController.js"
import express from "express"

const router = express.Router()

router.post('/vendorsignup',vendorSignup)
router.post('/vendorsignin',vendorSignin)
router.get('/vendorsignout',vendorSignout)


export default router