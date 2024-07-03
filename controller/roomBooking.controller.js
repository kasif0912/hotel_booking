const Bookings = require("../models/booking.schema");
const Room = require("../models/room.schema");
const stripe = require("stripe")(
  "sk_test_51OwgfASBZRhVBRtaNamK8QlK4ypKZevjpjKIuhKky56KPoVCiOgp6IqMiqgGJu7BvWfXHOd7S6e76gUepEcQYYg20091V6xyVv"
);

const roomBooking = async (req, res) => {
  const bookingDetails = req.body;
  console.log(bookingDetails);

  const room = bookingDetails.room;

  const lineItems = [
    {
      price_data: {
        currency: "inr",
        product_data: {
          name: room.name,
          images: room.imageUrls,
        },
        unit_amount: room.rentPerDay * bookingDetails.totalDays * 100,
      },
      quantity: 1,
    },
  ];

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    // Send response with the session ID
    console.log(session);
    res.json({ id: session.id });
    console.log("Session created successfully");

    if (session.id) {
      const { userId, fromDate, toDate, totalAmount, totalDays } =
        bookingDetails;

      const newBooking = new Bookings({
        room: room.name,
        roomId: room._id,
        userId,
        fromDate,
        toDate,
        totalAmount,
        totalDays,
        transactionId: "123", // Use Stripe's payment intent ID
      });

      const booking = await newBooking.save();

      const tempRoom = await Room.findOne({ _id: room._id });
      tempRoom.currentBookings.push({
        bookingId: booking._id,
        fromDate,
        toDate,
        userId,
        status: booking.status,
      });

      await tempRoom.save();
      console.log("Room booked");
    } else {
      console.log("Payment intent not found.");
    }
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Failed to process booking" });
  }
};

const getRoomBookingsById = async (req, res) => {
  const { userId } = req.body;
  // console.log(userId);
  try {
    const booking = await Bookings.find({ userId: userId });
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const cancelbooking = async (req, res) => {
  const { bookingid, roomid } = req.body;
  console.log(bookingid, roomid);
  try {
    const bookingItem = await Bookings.findOne({ _id: bookingid });
    bookingItem.status = "Cancelled";
    await bookingItem.save();

    const room = await Room.findOne({ _id: roomid });

    const bookings = room.currentBookings;
    const temp = bookings.filter(
      (booking) => booking.bookingId.toString() !== bookingid
    );
    room.currentBookings = temp;
    await room.save();

    return res
      .status(200)
      .json({ message: "Your Booking is Cancelled", bookingItem });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getallbookings = async (req, res) => {
  try {
    const bookings = await Bookings.find();
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  roomBooking,
  getRoomBookingsById,
  cancelbooking,
  getallbookings,
};
