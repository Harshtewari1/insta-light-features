const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});


async function uploadFile(file,filename) {
    try {
        const response = await imagekit.upload({
            file: file,        // should be base64 string, URL, or buffer
            fileName: filename
        });

        return response;
    } catch (error) {
        console.error("ImageKit Upload Error:", error);
        throw new Error("Image upload failed: " + error.message); // bubble up to controller
    }
}


module.exports = uploadFile