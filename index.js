const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config({ quiet: true });

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Trip Booking API Server is running!"));

app.use("/api/auth", authRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/admin", adminRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("mongodb connected successfully");
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});
