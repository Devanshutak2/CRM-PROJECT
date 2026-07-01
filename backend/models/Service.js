const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    vehicleNumber: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    serviceType: {
      type: String,
      enum: [
        "General Service",
        "Periodic Maintenance",
        "Repair",
        "Insurance Claim",
        "Pre-Delivery Inspection",
      ],
      default: "General Service",
    },
    technician: { type: String, default: "Unassigned" },
    status: {
      type: String,
      enum: ["Awaiting Parts", "In Progress", "Done"],
      default: "In Progress",
    },
    estCompletion: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);
