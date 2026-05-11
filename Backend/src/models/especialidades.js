import {Schema, model} from "mongoose";

//Model Especialidad
const Especialidad =  new Schema ({
    specialtyName:{type: String},
    isAvailable:{type: Boolean, default: true}
},
    {
        timestamps: true,
        strict:false,
    }
)

export default model("Especialidad", Especialidad);