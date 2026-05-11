import { config } from "../backend/config.js";
import mongoose from "mongoose"

mongoose.connect(config.db.URI);

const connection = mongoose.connection;

connection.on("open", ()=>{
    console.log("Base de datos conectada");
})

connection.on("disconnected", ()=>{
    console.log("Desconectado de la base de datos")
})

connection.on("error", error=>{
    console.log("Error en conectar la base de datos")
})
