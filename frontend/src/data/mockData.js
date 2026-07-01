// Fallback demo data — used only if the live backend is unreachable,
// so the presentation never shows a blank screen.

export const mockVehicles = [
  { _id: "v1", model: "Honda Activa 6G", variant: "STD", color: "Pearl White", price: 80930, stock: 22, lowStockThreshold: 8, criticalStockThreshold: 3, imageEmoji: "🛵" },
  { _id: "v2", model: "Honda Activa 125", variant: "DLX", color: "Matte Maroon", price: 91553, stock: 14, lowStockThreshold: 8, criticalStockThreshold: 3, imageEmoji: "🛵" },
  { _id: "v3", model: "Honda Dio", variant: "STD", color: "Sports Red", price: 78463, stock: 6, lowStockThreshold: 8, criticalStockThreshold: 3, imageEmoji: "🛵" },
  { _id: "v4", model: "Honda Shine 100", variant: "Drum", color: "Black", price: 68913, stock: 19, lowStockThreshold: 8, criticalStockThreshold: 3, imageEmoji: "🏍️" },
  { _id: "v5", model: "Honda SP 125", variant: "Disc", color: "Athletic Blue", price: 98763, stock: 3, lowStockThreshold: 8, criticalStockThreshold: 3, imageEmoji: "🏍️" },
  { _id: "v6", model: "Honda Unicorn", variant: "STD", color: "Geny Grey", price: 119915, stock: 9, lowStockThreshold: 8, criticalStockThreshold: 3, imageEmoji: "🏍️" },
  { _id: "v7", model: "Honda Hornet 2.0", variant: "STD", color: "Sports Red", price: 145169, stock: 2, lowStockThreshold: 8, criticalStockThreshold: 3, imageEmoji: "🏍️" },
];

export const mockCustomers = [
  { _id: "c1", name: "Rohit Sharma", phone: "98290 11234", email: "rohit.sharma@example.com", vehicleInterest: "Honda Hornet 2.0", source: "Walk-in", status: "Hot", assignedRep: "Anita Verma", lastContact: new Date() },
  { _id: "c2", name: "Priya Mathur", phone: "97831 44521", email: "priya.mathur@example.com", vehicleInterest: "Honda Activa 125", source: "Website", status: "Warm", assignedRep: "Sanjay Rathi", lastContact: new Date() },
  { _id: "c3", name: "Vikram Singh", phone: "94141 22987", email: "vikram.singh@example.com", vehicleInterest: "Honda Shine 100", source: "Referral", status: "New", assignedRep: "Anita Verma", lastContact: new Date() },
  { _id: "c4", name: "Neha Agarwal", phone: "99281 30056", email: "neha.agarwal@example.com", vehicleInterest: "Honda Activa 6G", source: "Phone Inquiry", status: "Cold", assignedRep: "Rahul Joshi", lastContact: new Date() },
  { _id: "c5", name: "Karan Mehta", phone: "98765 90123", email: "karan.mehta@example.com", vehicleInterest: "Honda Unicorn", source: "Social Media", status: "Hot", assignedRep: "Sanjay Rathi", lastContact: new Date() },
  { _id: "c6", name: "Sunita Rao", phone: "90017 65432", email: "sunita.rao@example.com", vehicleInterest: "Honda Dio", source: "Walk-in", status: "Warm", assignedRep: "Rahul Joshi", lastContact: new Date() },
];

export const mockTestRides = [
  { _id: "t1", customerName: "Rohit Sharma", phone: "98290 11234", vehicle: "Honda Hornet 2.0", time: "10:30 AM", assignedRep: "Anita Verma", status: "Done" },
  { _id: "t2", customerName: "Karan Mehta", phone: "98765 90123", vehicle: "Honda Unicorn", time: "12:00 PM", assignedRep: "Sanjay Rathi", status: "In Progress" },
  { _id: "t3", customerName: "Sunita Rao", phone: "90017 65432", vehicle: "Honda Dio", time: "3:00 PM", assignedRep: "Rahul Joshi", status: "Scheduled" },
  { _id: "t4", customerName: "Priya Mathur", phone: "97831 44521", vehicle: "Honda Activa 125", time: "4:30 PM", assignedRep: "Sanjay Rathi", status: "Scheduled" },
];

export const mockServices = [
  { _id: "s1", customerName: "Deepak Chouhan", vehicleNumber: "RJ14 SX 4521", vehicleModel: "Honda Activa 6G", serviceType: "General Service", technician: "Mahesh Kumar", status: "In Progress" },
  { _id: "s2", customerName: "Anjali Bhatt", vehicleNumber: "RJ14 BR 9087", vehicleModel: "Honda Shine 100", serviceType: "Repair", technician: "Ramesh Yadav", status: "Awaiting Parts" },
  { _id: "s3", customerName: "Sandeep Soni", vehicleNumber: "RJ14 CT 1190", vehicleModel: "Honda Unicorn", serviceType: "Pre-Delivery Inspection", technician: "Mahesh Kumar", status: "Done" },
  { _id: "s4", customerName: "Ritu Saxena", vehicleNumber: "RJ14 DA 3345", vehicleModel: "Honda SP 125", serviceType: "Periodic Maintenance", technician: "Vinod Prajapati", status: "In Progress" },
];

// Last 6 months of unit sales, for the dashboard trend strip
export const mockMonthlySales = [
  { month: "Jan", units: 38 },
  { month: "Feb", units: 45 },
  { month: "Mar", units: 41 },
  { month: "Apr", units: 52 },
  { month: "May", units: 49 },
  { month: "Jun", units: 58 },
];

export const monthlyTarget = 65; // units, drives the dashboard gauge
