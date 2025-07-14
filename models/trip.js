const mongoose = require("mongoose");

const trip = new mongoose.Schema(
  {
    name: String,
    description: String,
    city: String,
    country: String,
    startDate: Date,
    endDate: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", trip);
