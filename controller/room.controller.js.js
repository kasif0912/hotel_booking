const Room = require("../models/room.schema");

const getAllRooms = async (req, res) => {
  try {
    // Fetch all products from the database
    const rooms = await Room.find();
    // Return the products in the response
    return res
      .status(200)
      .json({ message: "Hotels retrieved successfully", rooms });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRoomById = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    return res
      .status(200)
      .json({ message: "Room retrieved successfully", room });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addRoom = async (req, res) => {
  // console.log("Request Body:", req.body);
  try {
    const newRoom = new Room(req.body);
    // console.log("New Room:", newRoom);
    await newRoom.save();
    return res
      .status(200)
      .json({ message: "Room added successfully", newRoom });
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({ error: "Failed to add room" });
  }
};

module.exports = { getRoomById, getAllRooms, addRoom };
