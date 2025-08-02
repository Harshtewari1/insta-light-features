const express = require("express")
const authMiddleware = require('src/middleware/auth.middleware')
const multer = require('multer')
const { createPostController } = require("src/controllers/post.controller")

const upload = multer({ storage: multer.memoryStorage() })


const router = express.Router()


router.post("/",
    authMiddleware,
    upload.single('image'),
    createPostController
)


module.exports = router