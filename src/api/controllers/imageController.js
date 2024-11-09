const Image = require("../models/imageModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

let genAIInstance = null;
let modelInstance = null;

// Function to initialize the GoogleGenerativeAI instance and model if they haven't been created yet
const initializeGenAI = () => {
  if (!genAIInstance) {
    genAIInstance = new GoogleGenerativeAI(process.env.GEMINIAPI);
  }
  if (!modelInstance) {
    modelInstance = genAIInstance.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
  }
};

// Handle image upload
const uploadImage = async (req, res, next) => {
  try {
    // const newImage = new Image({
    //   data: req.file.buffer,
    //   contentType: req.file.mimetype,
    //   type: req.body.type,
    //   userId: req.user._id,
    // });

    const image = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    initializeGenAI();
    const response = await modelInstance.generateContent([
      image,
      `Provide the electricity bill in the following format JSON only in a normal text prompt not markdown, rememeber that true and false in JSON are lowercase and all the data other than Boolean should have quotes: {"isBillProvided": <Boolean>, "billDetails": { "amount": <Number>, "billDate": <String>, "dueDate": <String>, "units": <Number> } | null}`,
    ]);
    return res.status(200).json({
      message: "Text Fetched Successfully",
      response: JSON.parse(response.response.text()),
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  uploadImage,
};
