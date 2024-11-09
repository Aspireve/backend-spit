const Image = require("../models/imageModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const PossibleBuyer = require("../models/possibleBuyers");

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
exports.isRecycleable = async (req, res, next) => {
  try {

    const image = {
      inlineData: {
        data: req.file.buffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    initializeGenAI();
    const response = await modelInstance.generateContent([
      image,
      `Provide me data fromthe image in the following format JSON only in a normal text prompt not markdown, rememeber that true and false in JSON are lowercase and all the data other than Boolean should have quotes: {"allItemsSameType": <Boolean>, "itemType": enum("recycleable", "e-waste", "non-recycleable"),"itemDatabase": enum("aluminium", "battery", "books", "brass", "cardboard", "ceiling fan", "copper", "inverter", "iron", "metal e-waste", "motors ", "paper", "plastic bottles", "plastic e-waste", "printer", "steel utensils", null), "itemDescription": <String>}`,
    ]);
    return res.status(200).json({
      message: "Text Fetched Successfully",
      response: JSON.parse(response.response.text()),
    });
  } catch (error) {
    return next(error);
  }
};

// Handle image upload
exports.provideAmount = async (req, res, next) => {
  try {
    const {itemDatabase, quantity} = req.query

    const rateDocument = await PossibleBuyer.findOne({object: itemDatabase});

    return res.status(200).json({
      message: "Rates Fetched Successfully",
      rate: rateDocument.rate * quantity,
    });
  } catch (error) {
    return next(error);
  }
};