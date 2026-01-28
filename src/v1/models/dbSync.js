// dbSync.js
const Product = require("./product");
const Message = require("./message");
const Setting = require("./setting");
const User = require('./user');

const syncModels = async() => {
    try {
        await Product.sync({ alter: true });
        await Message.sync({ alter: true });
        await Setting.sync({ alter: true });
        await User.sync({ alter: true });
        console.log("✅ All models synchronized with PostgreSQL");
    } catch (error) {
        console.error("❌ Error synchronizing models:", error);
        throw error;
    }
};

module.exports = syncModels;