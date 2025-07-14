const Booking = require("../models/booking");
const User = require("../models/User");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({mesage:"All users retrieved successfully" ,users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find(req.query).populate("tripId","userId");
        res.status(200).json({message:"All Bookings retrieved successfully",bookings});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        booking.status = status;
        await booking.save();
        res.status(200).json({ message: "Booking status updated successfully", booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getAllBookings,
    updateBookingStatus,
};


