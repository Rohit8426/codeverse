const express = require("express");
const router = express.Router();
const {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} = require("../controller/tripController");
const { autherize } = require("../middleware/authMiddleware");

router.post("/", autherize, createTrip);
router.get("/", autherize, getAllTrips);
router.get("/:id", getTripById);
router.put("/:id", autherize, updateTrip);
router.delete("/:id", autherize, deleteTrip);

module.exports = router;
