const express = require("express");
const router = express.Router();
const TestRide = require("../models/TestRide");

// GET all test rides
router.get("/", async (req, res) => {
  try {
    const testRides = await TestRide.find().sort({ date: 1 });
    res.json(testRides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST schedule a new test ride
router.post("/add", async (req, res) => {
  try {
    const testRide = new TestRide(req.body);
    await testRide.save();
    res.status(201).json(testRide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a test ride (e.g. mark Done)
router.put("/:id", async (req, res) => {
  try {
    const testRide = await TestRide.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!testRide) return res.status(404).json({ error: "Test ride not found" });
    res.json(testRide);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a test ride
router.delete("/:id", async (req, res) => {
  try {
    const testRide = await TestRide.findByIdAndDelete(req.params.id);
    if (!testRide) return res.status(404).json({ error: "Test ride not found" });
    res.json({ message: "Test ride cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
