import { app } from "./app";
import { connectDb } from "./lib/connectDb";
import "dotenv/config"

const port = process.env.PORT || "3000"

connectDb()
.then(() => {
    console.log("Database connected!")
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
})
.catch((err) => {
    console.log("Some error occured while connecting to database!")
    console.log(err)
})