const express = require("express");
const router = express.Router();
const {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    generateQR
} = require("../controller/bookingController");

router.post("/newbooking", createBooking);
router.get("/allbookings", getAllBookings);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);
router.get("/qr/:id", generateQR);

module.exports = router;