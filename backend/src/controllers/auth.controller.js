const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")



async function registrationController(req, res) {
    const { username, password } = req.body

    const existingUser = await userModel.findOne({
        username
    })

    if (existingUser) {
        return res.status(409).json({
            message: "username already exist"
        })
    }

    const user = await userModel.create({
        username,
        password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.cookie('token', token)

    res.status(201).json({
        message: "user created successfully",
        user
    })
}


async function loginController(req, res) {
    const { username, password } = req.body

    const user = await userModel.findOne({
        username
    })
    if (!user) {
        return res.status(401).json({
            message: "invalid username or password"
        })
    }
    const isPasswordMatched = password === user.password;

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "invalid username or password"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token)

    res.status(200).json({
        message: "login successful",
        user: {
            username: user.username,
            id: user._id
        }
    })

}


module.exports = {
    registrationController,
    loginController
}