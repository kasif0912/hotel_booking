const express = require("express");
const router = new express.Router();
const authController = require("../controller/auth.controller");
const hotelController = require("../controller/hotel.controller");


router.post("/signup", authController.register);
router.post("/login", authController.login);

router.get("/gethotels", hotelController.getAllHotels);


module.exports = router;
