import express from "express"

import registerEstu from "../controllers/estudiantesRegister.js"

const router=express.Router()

router.route("/")
.post(registerEstu.register)

router.route("/verifyCodeEmail")
.post(registerEstu.verifyCode)

export default router;
