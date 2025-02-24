const express = require("express")
const userRoutes = require("./Routes/1. Auth")
const lotteryRoutes = require("./Routes/2. Lottery")
const cors = require("cors")

const app = express()

app.use(express.json())

app.use(cors())

app.use("/api/v1" , userRoutes)

app.use("/api/v1", lotteryRoutes)




app.listen(3000, () => {
    console.log("listening 3000")
})