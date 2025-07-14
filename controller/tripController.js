const Trip = require("../models/trip");

const createTrip = async (req, res) => {
  try {
    const { name, destination, city, country, startDate, endDate } = req.body;
    const trip = new Trip({
      name,
      destination,
      city,
      country,
      startDate,
      endDate,
    });
    await trip.save();
    res.status(201).json({ message: "Trip created successfully", trip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// all trip with filters date and city
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find(req.query);
    res.status(200).json({ trips });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, destination, city, country, startDate, endDate } = req.body;
    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    trip.name = name;
    trip.destination = destination;
    trip.city = city;
    trip.country = country;
    trip.startDate = startDate;
    trip.endDate = endDate;
    await trip.save();
    res.status(200).json({ message: "Trip updated successfully", trip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    await trip.remove();
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
};
