const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
const AuthController = require("./Controllers/AuthController.js")
const ProdController = require("./Controllers/ProdController.js")


const io = require('socket.io')(2000, {
    cors: {
        origin: ["http://localhost:3000"],
    }
})

mongoose.connect(process.env.REACT_apiKey, {})
    .then(() =>
        console.log("FUCKING conncection to database is ONLINE")
    )
    .catch(error => {
        console.log("error did not connect to database  FUCK")
        console.log(error)
    })

const app = express()

io.on('connection', (socket) => {
    console.log("FUCKING Socket is ONLINE")
    socket.on("send-bid", (bid) => {
        console.log(bid)

        io.emit("recive-bid", bid)

    })

})

app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json())
app.post("/SignUp", AuthController.register)
app.post("/Login", AuthController.login)
app.post("/Product", ProdController.product)
app.post("/ProductList", ProdController.productlist)
app.post("/BidUpdate/:id", ProdController.bid)
app.listen(8000, () => console.log("FUCKING ON PORT 8000"))