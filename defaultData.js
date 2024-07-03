const roomData = require("./constant/rooms");
const room = require("./models/room.schema.js");

const DefaultData = async () => {
  // console.log(productsdata);
  try {
    await room.deleteMany({});
    const storeData = await room.insertMany(roomData);
    // console.log(storeData);
  } catch (error) {
    console.log("error" + error.message);
  }
};

module.exports = DefaultData;
