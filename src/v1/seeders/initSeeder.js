const Setting = require("../models/setting");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

const runInitialSeed = async () => {
  try {
    const settingsCount = await Setting.count();

    if (settingsCount === 0) {
      await Setting.create({
        id: uuidv4(),
        logo_name: "Buy Bulk",
        email: "moha123live@gmail.com",
        place: "Bengaluru",
        fb: "https://facebook.com/",
        twitter: "https://x.com/",
        linked_in: "https://linkedin.com/",
        insta: "https://instagram.com/",
        location: "https://maps.app.goo.gl/j7KzdY1cHuKnibqA6",
        contact_phone: "8667753238",
        contact_email: "moha123live@gmail.com"
      });

      console.log("Default settings seeded");
    }

    const adminExists = await User.findOne({
      where: { email: "admin@gmail.com" }
    });

    if (!adminExists) {
      await User.create({
        id: uuidv4(),
        email: "admin@gmail.com",
        password: "e2d3b69db9c9c35ed46fc9ee95b04899:c79a6f82aa23e85ba4a7380a4f95437249c82c327b51137096e1566bf8175b8ecdd597e33bec5108f1c2a61703f80f16bd5b29da701924f588cbef80e7df3aa4",
        name: "Admin",
        phoneNumber: "9999999999",
        isActive: true
      });

      console.log("Default admin user seeded");
    }

  } catch (error) {
    console.error("Seeder failed:", error.message);
    throw error;
  }
};

module.exports = runInitialSeed;
