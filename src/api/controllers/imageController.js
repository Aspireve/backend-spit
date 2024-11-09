const Image = require("../models/imageModel");

// Handle image upload
const uploadImage = async (req, res) => {
  try {
    const newImage = new Image({
      data: req.file.buffer,
      contentType: req.file.mimetype,
      type: req.body.type,
      userId: req.user._id,
    });

    await newImage.save();
    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).json({ message: "Error uploading image" });
  }
};

module.exports = {
  uploadImage,
};
