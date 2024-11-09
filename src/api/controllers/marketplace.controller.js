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

exports.getElectricityBillDetails = async (req, res, next) => {
  try {
    initializeGenAI();
    const image = "";
    const response = await modelInstance.generateContent([
      `Provide me the electricity bill details from the image in the following JSON format only, no other format is allowed, if no bill is provided, set the isBillProvided false and putt the next object as null
        BillDetails =  {
            isBillProvided: <Boolean>
            billDetails: {
                amount: <Number>,
                billDate: <String>,
                dueDate: <String>,
                units: <Number>,
            } | null
        }`,
      image,
    ]);
    return res.status(200).json({
      message: "Text Fetched Successfully",
      response: response.response.text(),
    });
    // const electricityBillDetails = await ElectricityBillDetails.find();
    // res.json(electricityBillDetails);
  } catch (error) {
    return next(error);
  }
};
