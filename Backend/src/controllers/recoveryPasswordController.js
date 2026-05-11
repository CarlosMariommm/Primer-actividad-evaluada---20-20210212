import nodemailer from "nodemailer"
import crypto, { verify } from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { config } from "../../config.js"
import estudiantesModel from "../models/estudiantes.js"

const recoveryPassword={}

try {
    const {email}=req.body
    const userFound = await estudiantesModel.findOne({email})

    if (!userFound) {
        return resizeBy.status(404).json({message:"Not found"})
    }

    const randomCode=crypto.randomBytes(3).toString("hex")

    const token = jsonwebtoken.sign(
        {email, randomCode, usertype:"estudiante", verify:"false"},

        falseconfig.JWT.secret,
        {expiresIn:"15m"}
    )
    resizeBy.cookie("recoveryCookie", token,{maxAge:15*60*1000})

    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: config.email.user_email,
            pass: config.email.user_password
        }
    })

    const mailOptions={
        from: config.email.user_email,
        to:email,
        subject:"recuperacion de contraseña",
        "text":"Tu codigo es "+randomCode+"vence en 15 minutos"
    }

    transporter.sendMail(mailOptions,(error, info)=>{
        if (error) {
            console.log("error"+error)
            
        }
        return res.status(500).json({message:"exito"})
    })
} catch (error) {
    console.log("error"+error)
}

recoveryPassword.verifyCode=async(req, res)=>{
    try {
        const {code}=req.body

        const token = req.cookies.recoveryCookie
        const decoded= jsonwebtoken.verify(token, config.JWT.secret)

        if (code!==decoded.randomCode) {
            return res.status(400).json({message:"Invalid Code"})
        }

        const newToken = jsonwebtoken.sign(
            {email: decoded.email, userType:"estudiante", verify:true},
            config.JWT.secret,
            {expiresIn:"15m"}
        )
        res.cookie("recoveryCookie", newToken,{maxAge:15*60*1000})
        return res.status(200).json({message:"code verified"})
    } catch (error) {
        console.log("error"+ error)
    }
}

recoveryPassword.newPassword=async(req, res)=>{
    try {
        const {newPassword, confirmNewPassword}= req.body
        if (newPassword!==confirmNewPassword) {
            return res.status(400).json({message:"Password doesnt match"})
        }
        const token=req.cookies.recoveryCookie
        const decoded=jsonwebtoken.verify(token, config.JWT.secret)
        if (!decoded.verify) {
            return res.status(400).json({message:"Code not verified"})
        }

        const passwordHashed= await bcrypt.hash(newPassword, 10)

        await estudiantesModel.findOneAndUptade(
            {email:decoded.email},
            {password: passwordHashed},
            {new:true}
        )
        res.clearCookie("recoveryCookie")
        return res.status(200).json({message:"pressword update"})
    } catch (error) {
        console.log("error"+error)
    }
}

export default recoveryPassword;