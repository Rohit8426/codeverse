const Booking = require("../models/booking");
const Trip = require("../models/trip");
const qrcode = require("qrcode");

const createBooking = async (req, res) => {
  try {
    const { tripId, userId, name, email, journey_date, price } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    const booking = new Booking({
      trip: tripId,
      user: userId,
      name: name,
      email: email,
      journey_date: journey_date,
      price: price,
    });
    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res
      .status(200)
      .json({ message: "All Bookings retrieved successfully", bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found", error: err.message });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const { tripId, userId } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    booking.trip = tripId;
    booking.user = userId;
    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    await booking.remove();
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateQR = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    const qrCode = await qrcode.toDataURL(booking._id.toString());
    res.status(200).json({ qrCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  generateQR,
};
