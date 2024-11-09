const electricData = require("../models/electricModel");
const waterData = require("../models/waterModel");
const organicData = require("../models/organicModel");

const electricChart = async (req, res, next) => {
  try {
    const loggedInUser = req.user._id;

    const userElectricData = await electricData.find({ userId: loggedInUser });

    const unitsData = userElectricData.map((data) => {
      const [day, month, year] = data.billDate.split("-");
      const dateObj = new Date(`20${year}-${month}-${day}`);
      const monthName = dateObj.toLocaleDateString("en-US", { month: "long" });
      return {
        month: monthName,
        units: data.units,
      };
    });

    return res.status(200).json({ units: unitsData });
  } catch (error) {
    return next(error);
  }
};

const waterChart = async (req, res, next) => {
  try {
    const loggedInUser = req.user._id;

    const userWaterData = await waterData.find({ userId: loggedInUser });

    const waterUsageData = userWaterData.map((data) => {
      const [day, month, year] = data.billDate.split("-");
      const dateObj = new Date(`20${year}-${month}-${day}`);
      const monthName = dateObj.toLocaleDateString("en-US", { month: "long" });
      return {
        month: monthName,
        litres: data.litres,
      };
    });

    return res.status(200).json({ waterUsage: waterUsageData });
  } catch (error) {
    return next(error);
  }
};

const organicChart = async (req, res, next) => {
  try {
    const loggedInUser = req.user._id;

    // Fetch all organic data entries for the logged-in user
    const userOrganicData = await organicData.find({ userId: loggedInUser });

    // Format date to include only the month name and get kilo
    const organicUsageData = userOrganicData.map((data) => {
      const [day, month, year] = data.billDate.split("-"); // Split "DD-MM-YY" format
      const dateObj = new Date(`20${year}-${month}-${day}`); // Reformat to "YYYY-MM-DD"
      const monthName = dateObj.toLocaleDateString("en-US", { month: "long" }); // Get only the month name
      return {
        month: monthName,
        kilo: data.kilo,
      };
    });

    return res.status(200).json({ organicUsage: organicUsageData });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  electricChart,
  waterChart,
  organicChart,
};
