import {Schema, model} from "mongoose"

const estudiantesSchema = new Schema({
    name: {type:String},
    lastName: {type:String},
    email: {type:String},
    password: {type:String},
    birthdate: {type:Date},
    speciality_id: {type:String},
    carnet: {type:Number},
    phone: {type:Number},
    isVerified: {type:Boolean},
    loginAttemps: {type:Number},
    timeOut: {type:Date}
},{
    timestamps:true,
    strict:false
})

export default model ("customers", customerSchema)