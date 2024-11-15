import express from "express"
import contactRouter from "./routes/contact.route"
import cors from "cors"

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "16kb" }))
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))


app.use("/contact", contactRouter)

export {
    app
}