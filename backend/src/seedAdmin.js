const bcrypt = require("bcryptjs");
const User = require("./models/User");

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.warn("Admin credentials are not fully set in env");
    return;
  }

  const existing = await User.findOne({ email: adminEmail.toLowerCase() });

  if (existing) {
    return;
  }

  const hashed = await bcrypt.hash(adminPassword, 10);

  await User.create({
    email: adminEmail.toLowerCase(),
    password: hashed,
    role: "admin",
  });

  console.log("Default admin user created");
};

module.exports = seedAdmin;
