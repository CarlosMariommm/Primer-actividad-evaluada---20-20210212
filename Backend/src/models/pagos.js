// name, lastName, email, password, birthdate, speciality_id, carnet, pone, isVerified, loginAttempts, timeOut

import {Schema, model} from "mongoose";

//Model Pagos
const Pagos =  new Schema ({
    student_id:{type: Schema.Types.ObjectId, ref: "Estudiante"},
    amount:{type: Number},
    paymentDate:{type: Date},
    method:{type: String},
    status:{type: String},
    referenceNumber:{type: String, unique: true}
},
    {
        timestamps: true,
        strict:false,
    }
)

export default model("Pagos", Pagos);   
