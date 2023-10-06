import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
dotenv.config()
import userRouter from "./routes/UserRouter.js";
import adminRouter from "./routes/adminRouter.js"
import vendorRouter from "./routes/vendorRouter.js"

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, PATCH, DELETE",
    credentials: true
}

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.static("server/public"))
app.use(express.urlencoded({ extended: false }))

connectDB()

app.use("/api/users", userRouter)
app.use("/api/vendor", vendorRouter)
app.use("/api/admin", adminRouter)

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running at ${port}`))