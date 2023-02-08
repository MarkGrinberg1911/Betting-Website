const User = require("../Models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();

exports.register = async (req, res) => {
    const { email,
        firstname,
        lastname,
        password, } = req.body

        console.log(req.body)
    const hash = await bcrypt.hash(password, 10)

    const newUser = new User({ email, password: hash, firstname, lastname })
    newUser.save((error, user) => {
        if (error) {
            console.log(error)
            res.status(500).send(error)
        }
        else {
            res.status(200).json({ messege: "User added", user })
        }
    })
}
//login
exports.login = (req, res) => {
    User.findOne({ email: req.body.email }, (error, user) => {
        console.log(req.body)

        if (error) {
            res.status(500).res.send(error)
        }
        else if (!user) {
            res.send(error + "  " + "fuck you")
            res.status(400)
        }
        else {
            bcrypt.compare(req.body.password, user.password,
                (error, ismatch) => {

                    if (error || !ismatch) {
                        res.status(569).json({ messege: "fuck off" })
                    }

                    else {
                        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN)
                        const respo = { token: token, id: user._id, username: user.firstname }
                        res.json({ respo, messege: "Logged in FUCK YEA" })
                    }
                })
        }
    })
}