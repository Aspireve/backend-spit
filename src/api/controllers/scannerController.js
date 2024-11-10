const electricData = require("../models/electricModel");
const waterData = require("../models/waterModel");
const organicData = require("../models/organicModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const EcoScoreModel = require("../models/EcoScoreModel");

let genAIInstance = null;
let modelInstance = null;

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

const electric = async (req, res, next) => {
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
      `Provide the electricity bill in the following format JSON only in a normal text prompt not markdown, rememeber that true and false in JSON are lowercase and all the data other than Boolean should have quotes: {"isBillProvided": <Boolean>, "billDetails": { "amount": <Number>, "billDate": <String>, "dueDate": <String>, "units": <Number> } | null}`,
    ]);
    const data = JSON.parse(response.response.text());
    if (!data.isBillProvided) {
      throw new Error("Please provide the bill");
    }
    const newData = new electricData({
      amount: data.billDetails.amount,
      billDate: data.billDetails.billDate,
      dueDate: data.billDetails.dueDate,
      units: data.billDetails.units,
      type: "electric",
      userId: req.user._id,
    });
    await newData.save();

    let ecoScores = null;

    // Fetch previous electric data entries for the logged-in user
    const previousEntries = await electricData.find({ userId: req.user._id });
    if (previousEntries.length > 1) {
      // Calculate the average units of previous entries
      const avgUnits =
        previousEntries.reduce(
          (sum, entry) => sum + parseFloat(entry.units),
          0
        ) / previousEntries.length;

      // Calculate the ecoScore based on the average units
      ecoScores = ((avgUnits - data.billDetails.units) / avgUnits) * 100;

      // Save the ecoScore for the user
      const ecoScoreEntry = new EcoScoreModel({
        userId: req.user._id,
        ecoScore: ecoScores,
      });
      await ecoScoreEntry.save();
    }

    // Include ecoScore in the response
    return res.status(200).json({
      electricData: newData,
      ecoScore: ecoScores,
    });
  } catch (error) {
    return next(error);
  }
};

const getElectricData = async (req, res, next) => {
  try {
    const loggedInUser = req.user._id;

    // Fetch all electric data entries for the logged-in user
    const userElectricData = await electricData.find({ userId: loggedInUser });

    return res.status(200).json({ electricData: userElectricData });
  } catch (error) {
    return next(error);
  }
};

const water = async (req, res, next) => {
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
      `Provide the water bill in the following format JSON only in a normal text prompt not markdown, rememeber that true and false in JSON are lowercase and all the data other than Boolean should have quotes: {"isBillProvided": <Boolean>, "billDetails": { "amount": <Number>, "billDate": <String>, "dueDate": <String>, "litres": <Number> } | null}`,
    ]);
    const data = JSON.parse(response.response.text());
    if (!data.isBillProvided) {
      throw new Error("Please provide the bill");
    }
    const newData = new waterData({
      amount: data.billDetails.amount,
      billDate: data.billDetails.billDate,
      dueDate: data.billDetails.dueDate,
      litres: data.billDetails.litres,
      type: "water",
      userId: req.user._id,
    });
    await newData.save();

    let ecoScores = null;

    // Fetch previous water data entries for the logged-in user
    const previousEntries = await waterData.find({ userId: req.user._id });
    // console.log("previousEntries", previousEntries);
    if (previousEntries.length > 1) {
      // Calculate the average litres of previous entries
      const avgLitres =
        previousEntries.reduce(
          (sum, entry) => sum + parseFloat(entry.litres),
          0
        ) / previousEntries.length;
      // console.log("avgLitres", avgLitres);

      // Calculate the ecoScore based on the average litres
      ecoScores = ((avgLitres - data.billDetails.litres) / avgLitres) * 100;
      // console.log("ecoScores", ecoScores);

      // Save the ecoScore for the user
      const ecoScoreEntry = new EcoScoreModel({
        userId: req.user._id,
        ecoScore: ecoScores,
      });
      await ecoScoreEntry.save();
    }

    // Include ecoScore in the response
    return res.status(200).json({
      waterData: newData,
      ecoScore: ecoScores,
    });
  } catch (error) {
    return next(error);
  }
};

const getWaterData = async (req, res, next) => {
  try {
    const loggedInUser = req.user._id;

    // Fetch all water data entries for the logged-in user
    const userWaterData = await waterData.find({ userId: loggedInUser });

    return res.status(200).json({ waterData: userWaterData });
  } catch (error) {
    return next(error);
  }
};

const organic = async (req, res, next) => {
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
      `Provide the organic bill in the following format JSON only in a normal text prompt not markdown, rememeber that true and false in JSON are lowercase and all the data other than Boolean should have quotes: {"isBillProvided": <Boolean>, "billDetails": { "amount": <Number>, "billDate": <String>, "kilo": <Number> } | null}`,
    ]);
    const data = JSON.parse(response.response.text());
    if (!data.isBillProvided) {
      throw new Error("Please provide the bill");
    }
    const newData = new organicData({
      amount: data.billDetails.amount,
      billDate: data.billDetails.billDate,
      kilo: data.billDetails.kilo,
      type: "organic",
      userId: req.user._id,
    });
    await newData.save();

    let ecoScores = null;

    ecoScores = data.billDetails.kilo * 0.02;

    const ecoScoreEntry = new EcoScoreModel({
      userId: req.user._id,
      ecoScore: ecoScores,
    });

    await ecoScoreEntry.save();

    return res.status(200).json({ organicData: newData, ecoScore: ecoScores });
  } catch (error) {
    return next(error);
  }
};

const getOrganicData = async (req, res, next) => {
  try {
    const loggedInUser = req.user._id;

    // Fetch all organic data entries for the logged-in user
    const userOrganicData = await organicData.find({ userId: loggedInUser });

    return res.status(200).json({ organicData: userOrganicData });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  electric,
  water,
  organic,
  getElectricData,
  getWaterData,
  getOrganicData,
};
