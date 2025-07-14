const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getAllBookings,
  updateBookingStatus,
} = require("../controller/adminController");
const { autherize } = require("../middleware/authMiddleware");

router.get("/users", autherize, getAllUsers);
router.get("/bookings", autherize, getAllBookings);
router.put("/bookings/:id", autherize, updateBookingStatus);

module.exports = router;
