import express from "express"
import recoveryPassword from "../controllers/recoveryPasswordController"

const router = express.Router()

router.route("/requestCode").post(recoveryPassword.requestCode)

router.route("/verifyCode").post