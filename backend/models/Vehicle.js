const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    model: { type: String, required: true, trim: true },
    variant: { type: String, default: "Standard" },
    color: { type: String, default: "White" },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    lowStockThreshold: { type: Number, default: 3 },
    criticalStockThreshold: { type: Number, default: 1 },
    imageEmoji: { type: String, default: "🚗" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);
