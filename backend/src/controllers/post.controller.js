const postModel = require('src/models/post.model')
const generateCaption = require('src/service/ai.service')

async function createPostController(req, res) {
    const file = req.file;
    console.log("file received", file);

    const base64ImageFile = Buffer.from(file.buffer).toString("base64")
    console.log(base64ImageFile);

    const caption = await generateCaption(base64ImageFile);


    res.send({
        caption
    })

}


module.exports = {
    createPostController
}