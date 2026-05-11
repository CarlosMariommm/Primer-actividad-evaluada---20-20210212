import {Schema, model} from "mongoose";

//Model Profesor
const Profesor =  new Schema ({
    name:{type: String},
    lastName:{type: String},
    email:{type: String, unique: true},
    password:{type: String},
    hireDate:{type: Date},
    phone:{type: String},
    isActive:{type: Boolean, default: true},
    isVerified:{type: Boolean, default: false},
    loginAttempts:{type: Number, default: 0},
    timeOut:{type: Date},
},
    {
        timestamps: true,
        strict:false,
    }
)

export default model("Profesor", Profesor);