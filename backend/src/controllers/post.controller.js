const postModel = require('../models/post.model')
const generateCaption = require('../service/ai.service');
const uploadFile = require('../service/storage.service');
const { v4: uuidv4 } = require("uuid");

async function createPostController(req, res) {
    const file = req.file;
    console.log("file received", file);

    const base64ImageFile = Buffer.from(file.buffer).toString("base64")
    // console.log(base64ImageFile);

    const caption = await generateCaption(base64ImageFile);
    const result = await uploadFile(file.buffer, `${uuidv4()}`);


    res.json({
        caption,
        result,
    })

}


module.exports = {
    createPostController
}