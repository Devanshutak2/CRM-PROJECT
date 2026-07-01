const mongoose = require("mongoose");

const TestRideSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, default: "" },
    vehicle: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    time: { type: String, required: true, default: "10:00 AM" },
    assignedRep: { type: String, default: "Unassigned" },
    status: {
      type: String,
      enum: ["Scheduled", "In Progress", "Done", "Cancelled"],
      default: "Scheduled",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestRide", TestRideSchema);
