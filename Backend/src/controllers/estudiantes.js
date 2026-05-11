import estudiantesModels from "../models/estudiantes.js"

const estudiantesController={}

estudiantesController.getEstudiantes=async(req, res)=>{
    try {
        const estudiantes=await estudiantesModels.find()
        return res.status(200).json(estudiantes)
    } catch (error) {
        console.log("error"+ error)
    }
}

estudiantesController.putEstudiantes=async(req,res)=>{
    try {
        let{
            name,
            lastName,
            email,
            password,
            birthdate,
            speciality_id,
            carnet,
            phone,
            isVerified
        }=req.body

        name=name?.trim()
        email=email?.trim()

        if (!name||!email||!password) {
            return res.status(400).json({message:"field required"})
        }
        if (name.length<3||name.length>20) {
            return res.status(400).json({message:"Please insert a valid name"})
        }

        const putEstudiantes=await estudiantesModels.findByIdAndUpdate(req.params.id)

        if (!putEstudiantes) {
            return res.status(404).json({message: "Not found"})
        }
        return res.status(200).json({message:"Updated"})
    } catch (error) {
        console.log("error"+error)
    }
}

estudiantesController.deleteEstudiante=async(req, res)=>{
    try {
        const deleteEstudiante=estudiantesModels.findByIdAndDelete(req.params.id)

        if (!deleteEstudiante) {
            return res.status(400).json({message:"not found"})
        }
        return res.status(200).json({message:"deleted"})
    } catch (error) {
        console.log("error"+error)
    }
}

export default estudiantesController;