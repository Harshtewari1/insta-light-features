const express = require('express')
const { registrationController, loginController } = require("src/controllers/auth.controller")
const router = express.Router()


router.post('/register', registrationController)
router.post('/login', loginController)



module.exports = router