const express = require("express");
const router = new express.Router();
const authController = require("../controller/auth.controller");
const roomController = require("../controller/room.controller.js");
const authenticate = require("../middleware/authenticate");
const roomBookingController = require("../controller/roomBooking.controller");

router.post("/signup", authController.register);
router.post("/login", authController.login);
router.get("/getUser", authController.getUser);
router.get("/api/getallusers", authController.getallUser);

router.get("/api/getrooms", roomController.getAllRooms);
router.get("/api/getroomById/:id", roomController.getRoomById);
router.post(
  "/api/getBookingByUserId/",
  roomBookingController.getRoomBookingsById
);
router.post("/api/cancelbooking", roomBookingController.cancelbooking);
router.get("/api/getallbookings", roomBookingController.getallbookings);
router.post("/api/addroom", roomController.addRoom);
router.post("/api/create-checkout-session", roomBookingController.roomBooking);

// router.post("/api/create-checkout-session", async (req, res) => {
//   const bookingDetails = req.body;
//   console.log(bookingDetails);

//   // Extract relevant room details from bookingDetails
//   const room = bookingDetails.room;

//   // Prepare lineItems array
//   const lineItems = [
//     {
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: room.name,
//           images: room.imageUrls, // Add images if needed
//         },
//         unit_amount: room.rentPerDay * bookingDetails.totalDays * 100, // Assuming rentPerDay is per day price
//       },
//       quantity: 1, // Assuming quantity is 1 for the entire stay
//     },
//   ];

//   // Create a Stripe Checkout session
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cancel", // Replace with your cancel URL
//     });

//     res.json({ id: session.id });
//     console.log("succses");
//   } catch (error) {
//     console.error("Error creating Stripe Checkout session:", error.message);
//     res.status(500).json({ error: "Failed to create Stripe Checkout session" });
//   }
// });

module.exports = router;
