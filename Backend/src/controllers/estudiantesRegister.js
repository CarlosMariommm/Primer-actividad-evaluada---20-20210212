import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"

import bcrypt from "bcryptjs"

import { config } from "../../config.js"

import estudiantesModel from "../models/estudiantes.js"

const registerEstudiantesController={}

registerEstudiantesController.register=async(req,res)=>{
    try {
        const{name, lastName, email, password, birthdate, speciality_id, carnet, phone, isVerified, loginAttemps, timeOut}= req.body

        const existEstudiantte=await estudiantesModel.findOne({email})
        if (existEstudiantte) {
            return res.status(400).json({message:"stuedent already exists"})
        }

        const passwordHashed=await bcrypt.hash(password,10)

        const randomCode=crypto.randomBytes(3).toString("hex")

        const token = jsonwebtoken.sign(
            {randomCode, name, lastName, birthdate, email, password: passwordHashed, isVerified, timeOut},

            config.JWT.secret,

            {expiresIn:"15m"}
        )

        res.cookie("registrationCookie", token, {maxAge: 15*60*1000})

        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        const mailOptions={
            from: config.email.user_email,
            to: email,
            subject:"verificacion de cuenta",
            text:"Para verificar la cuenta porfavor utiliza el siguiente codigo "+randomCode+" expira en 15 minutos."
        }

        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log("error"+error)
                return res.status(500).json({message:"error sendig email"})
            }
        })
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message:"Internal server error"})
    }
}

registerEstudiantesController.verifyCode=async(req, res)=>{
    try {
        const {verifyCodeRequest}=req.body
        const token = req.cookie.registrationcookie
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        const{randomCode: storedCode, name, lastName, email, password, birthdate, speciality_id, carnet, phone, isVerified, loginAttemps, timeOut}= decoded

        if (verifyCodeRequest!==storedCode) {
            return res.status(400).json({message:"Invalid Code"})
        }

        const newEstudiante = estudiantesModel({
            name, lastName, email, password, birthdate, speciality_id, carnet, phone, isVerified: true
        })

        await newEstudiante.save()

        res.clearCookie("registrationCookie")

        return res.status(200).json({message:"Estudiante registred"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message:"Internal Server error"})
    }
}