import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app=express();

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())

export default app;