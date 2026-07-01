const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

// GET all service jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Service.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add a new service job
router.post("/add", async (req, res) => {
  try {
    const job = new Service(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a service job (e.g. status change)
router.put("/:id", async (req, res) => {
  try {
    const job = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job) return res.status(404).json({ error: "Service job not found" });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a service job
router.delete("/:id", async (req, res) => {
  try {
    const job = await Service.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: "Service job not found" });
    res.json({ message: "Service job removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
