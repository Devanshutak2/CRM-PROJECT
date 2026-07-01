require("dotenv").config();
const mongoose = require("mongoose");
const Customer = require("./models/Customer");
const Vehicle = require("./models/Vehicle");
const TestRide = require("./models/TestRide");
const Service = require("./models/Service");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/sangam_motors_crm";

const vehicles = [
  { model: "Honda Activa 6G", variant: "STD", color: "Pearl White", price: 80930, stock: 22, lowStockThreshold: 8, criticalStockThreshold: 3, imageEmoji: "🛵" },
  { model: "Honda Activa 125", variant: "DLX", color: "Matte Maroon", price: 91553, stock: 14, lowStockThreshold: 8, criticalStockThreshold: 3, imageEmoji: "🛵" },
  { model: "Honda Dio", variant: "STD", color: "Sports Red", price: 78463, stock: 6, lowStockThreshold: 8, criticalStockThreshold: 3, imageEmoji: "🛵" },
  { model: "Honda Shine 100", variant: "Drum", color: "Black", price: 68913, stock: 19, lowStockThreshold: 8, criticalStockThreshold: 3, imageEmoji: "🏍️" },
  { model: "Honda SP 125", variant: "Disc", color: "Athletic Blue", price: 98763, stock: 3, lowStockThreshold: 8, criticalStockThreshold: 3, imageEmoji: "🏍️" },
  { model: "Honda Unicorn", variant: "STD", color: "Geny Grey", price: 119915, stock: 9, lowStockThreshold: 8, criticalStockThreshold: 3, imageEmoji: "🏍️" },
  { model: "Honda Hornet 2.0", variant: "STD", color: "Sports Red", price: 145169, stock: 2, lowStockThreshold: 8, criticalStockThreshold: 3, imageEmoji: "🏍️" },
];

const customers = [
  { name: "Rohit Sharma", phone: "98290 11234", email: "rohit.sharma@example.com", vehicleInterest: "Honda Hornet 2.0", source: "Walk-in", status: "Hot", assignedRep: "Anita Verma" },
  { name: "Priya Mathur", phone: "97831 44521", email: "priya.mathur@example.com", vehicleInterest: "Honda Activa 125", source: "Website", status: "Warm", assignedRep: "Sanjay Rathi" },
  { name: "Vikram Singh", phone: "94141 22987", email: "vikram.singh@example.com", vehicleInterest: "Honda Shine 100", source: "Referral", status: "New", assignedRep: "Anita Verma" },
  { name: "Neha Agarwal", phone: "99281 30056", email: "neha.agarwal@example.com", vehicleInterest: "Honda Activa 6G", source: "Phone Inquiry", status: "Cold", assignedRep: "Rahul Joshi" },
  { name: "Karan Mehta", phone: "98765 90123", email: "karan.mehta@example.com", vehicleInterest: "Honda Unicorn", source: "Social Media", status: "Hot", assignedRep: "Sanjay Rathi" },
  { name: "Sunita Rao", phone: "90017 65432", email: "sunita.rao@example.com", vehicleInterest: "Honda Dio", source: "Walk-in", status: "Warm", assignedRep: "Rahul Joshi" },
];

const today = new Date();
const testRides = [
  { customerName: "Rohit Sharma", phone: "98290 11234", vehicle: "Honda Hornet 2.0", date: today, time: "10:30 AM", assignedRep: "Anita Verma", status: "Done" },
  { customerName: "Karan Mehta", phone: "98765 90123", vehicle: "Honda Unicorn", date: today, time: "12:00 PM", assignedRep: "Sanjay Rathi", status: "In Progress" },
  { customerName: "Sunita Rao", phone: "90017 65432", vehicle: "Honda Dio", date: today, time: "3:00 PM", assignedRep: "Rahul Joshi", status: "Scheduled" },
  { customerName: "Priya Mathur", phone: "97831 44521", vehicle: "Honda Activa 125", date: today, time: "4:30 PM", assignedRep: "Sanjay Rathi", status: "Scheduled" },
];

const services = [
  { customerName: "Deepak Chouhan", vehicleNumber: "RJ14 SX 4521", vehicleModel: "Honda Activa 6G", serviceType: "General Service", technician: "Mahesh Kumar", status: "In Progress" },
  { customerName: "Anjali Bhatt", vehicleNumber: "RJ14 BR 9087", vehicleModel: "Honda Shine 100", serviceType: "Repair", technician: "Ramesh Yadav", status: "Awaiting Parts" },
  { customerName: "Sandeep Soni", vehicleNumber: "RJ14 CT 1190", vehicleModel: "Honda Unicorn", serviceType: "Pre-Delivery Inspection", technician: "Mahesh Kumar", status: "Done" },
  { customerName: "Ritu Saxena", vehicleNumber: "RJ14 DA 3345", vehicleModel: "Honda SP 125", serviceType: "Periodic Maintenance", technician: "Vinod Prajapati", status: "In Progress" },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected. Clearing old data...");

    await Promise.all([
      Customer.deleteMany({}),
      Vehicle.deleteMany({}),
      TestRide.deleteMany({}),
      Service.deleteMany({}),
    ]);

    await Vehicle.insertMany(vehicles);
    await Customer.insertMany(customers);
    await TestRide.insertMany(testRides);
    await Service.insertMany(services);

    console.log("Sangam Motors demo data seeded successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
