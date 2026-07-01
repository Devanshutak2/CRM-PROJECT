const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    vehicleInterest: { type: String, default: "Not specified" },
    source: {
      type: String,
      enum: ["Walk-in", "Website", "Referral", "Phone Inquiry", "Social Media"],
      default: "Walk-in",
    },
    status: {
      type: String,
      enum: ["New", "Hot", "Warm", "Cold", "Won", "Lost"],
      default: "New",
    },
    assignedRep: { type: String, default: "Unassigned" },
    lastContact: { type: Date, default: Date.now },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);
