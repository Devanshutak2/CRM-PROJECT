// Creates or updates a login for the owner / a staff member.
// Usage:
//   node createUser.js "Vijay Tak" vijay@sangammotors.in "some-strong-password" owner
//   node createUser.js "Ujjwal" ujjwal@sangammotors.in "another-password" manager
//
// Roles: owner | manager | staff

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

async function main() {
  const [, , name, email, password, role = "staff"] = process.argv;

  if (!name || !email || !password) {
    console.log(
      'Usage: node createUser.js "Full Name" email@example.com "password" [owner|manager|staff]'
    );
    process.exit(1);
  }

  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/sangam_motors_crm";
  await mongoose.connect(MONGO_URI);

  let user = await User.findOne({ email: email.toLowerCase().trim() });
  if (user) {
    await user.setPassword(password);
    user.name = name;
    user.role = role;
    user.active = true;
    await user.save();
    console.log(`Updated existing user: ${email} (role: ${role})`);
  } else {
    user = new User({ name, email: email.toLowerCase().trim(), role });
    await user.setPassword(password);
    await user.save();
    console.log(`Created new user: ${email} (role: ${role})`);
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Failed to create user:", err.message);
  process.exit(1);
});
