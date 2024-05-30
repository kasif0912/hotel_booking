const Hotel = require("../models/hotel.schema");

const getAllHotels = async (req, res) => {
  try {
    // Fetch all products from the database
    const hotels = await Hotel.find();
    // Return the products in the response
    return res
      .status(200)
      .json({ message: "Hotels retrieved successfully", hotels });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllHotels };
