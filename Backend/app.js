import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import register from "../Backend/src/routes/register"

const app=express();

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())

app.use("/api")
app.use("/register", register)


export default app;