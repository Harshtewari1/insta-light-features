require("dotenv").config();


const { GoogleGenAI } = require ("@google/genai");

const ai = new GoogleGenAI({});


//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: "explain the meaning of harsh in one sentence",
//     });
//     console.log(response.text);
// }

// main();

async function generateCaption(base64ImageFile) {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: `
            you are expert in generating captions.
            you can generate a single caption for the images.
            your caption should be short and concise.
            Generate caption in tappori language .
            `
        }
    });
   return response.text;
}


module.exports = generateCaption