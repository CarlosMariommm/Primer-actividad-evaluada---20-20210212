import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { config } from "../../config.js"
import estudiantesModel from "../models/estudiantes.js"
import {json} from "express"

const loginEstudiantesController={}

loginEstudiantesController.login=async(req, res)=>{
    try {
        const {email, password}=req.body
        const estudiantesFound = await estudiantesModel.findOne({email})

        if (!estudiantesFound) {
            return res.status(400).json({message:"Estudiante not found"})
        }

        if (estudiantesFound.timeOut && estudiantesFound.timeOut > Date.now()) {
            return res.status(403).json({essage:"Blocked account"})
        }

        const isMatch = await bcrypt.js.compare(password, estudiantesFound.password)

        if (!isMatch) {
            estudiantesFound.loginAttemps=(estudiantesFound.loginAttemps || 0)+1
            return res.status(401).json({message:"Wron password"})
        }
        if (estudiantesFound.loginAttemps>= 5) {
            estudiantesFound.timeOut=Date.now()+5*60*1000
            estudiantesFound.loginAttemps=0
            await estudiantesFound.save()
            
            return res.status(400).json({message:"Blocked account for many attemps"})
        }
        await estudiantesFound.save()
        
        estudiantesFound.loginAttemps=0
        estudiantesFound.timeOut=null
        const token= jsonwebtoken.sign(
            {id: estudiantesFound._id, userType:"estudiante"},
            config.JWT.secret,
            {expiresIn:"30d"}
        )
        res.cookie("authCookie", token)

        return res.status(200).json({message:"login successfully"})

    } catch (error) {
        console.log("error" + error)
    }
}

export default loginEstudiantesController;