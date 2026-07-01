const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");

// GET all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ model: 1 });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add a new vehicle
router.post("/add", async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a vehicle (e.g. stock count)
router.put("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a vehicle
router.delete("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
    res.json({ message: "Vehicle removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
