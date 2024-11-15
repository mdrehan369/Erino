import express from "express"
import contactRouter from "./routes/contact.route"
import cors from "cors"

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "16kb" }))
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}))


app.use("/contact", contactRouter)

export {
    app
}