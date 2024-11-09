const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.model = null;

exports.connect = () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINIAPI);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  exports.model = model;
  return exports.model;
};
