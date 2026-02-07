// dbSync.js
const Product = require("./product");
const Message = require("./message");
const Setting = require("./setting");
const User = require('./user');
const runInitialSeed = require("../seeders/initSeeder");

const syncModels = async() => {
    try {
        // await Product.sync({ alter: true });
        // await Message.sync({ alter: true });
        // await Setting.sync({ alter: true });
        // await User.sync({ alter: true });
        await Product.sync();
        await Message.sync();
        await Setting.sync();
        await User.sync();
        await runInitialSeed();
        console.log('Models synchronized');
    } catch (error) {
        console.log("Error synchronizing models:", error);
        throw error;
    }
};

module.exports = syncModels;