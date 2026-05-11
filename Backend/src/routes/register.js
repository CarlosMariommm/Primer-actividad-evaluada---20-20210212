import express from "express"

import registerE from "../controllers/estudiantesRegister.js"

const router=express.Router()

router.route("/")
.post(registerE.register)

router.route("/verifyCodeEmail")
.post(registerE.verifyCode)

export default router;
