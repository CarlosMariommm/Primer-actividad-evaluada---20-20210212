import {Schema, model} from "mongoose";

//Model Materias
const Materias =  new Schema ({
    speciality_id:{type: Schema.Types.ObjectId, ref: "Especialidad"},
    isAvailable:{type: Boolean, default: true}
},
    {
        timestamps: true,
        strict:false,
    }
)


export default model("Materias", Materias);