const HotelData = require("./constant/hotelData");
const Hotel = require("./models/hotel.schema");

const DefaultData = async () => {
  // console.log(productsdata);
  try {
    await Hotel.deleteMany({});
    const storeData = await Hotel.insertMany(HotelData);
    console.log(storeData);
  } catch (error) {
    console.log("error" + error.message);
  }
};

module.exports = DefaultData;
