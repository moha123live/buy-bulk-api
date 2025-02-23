const Product = require("./product");
const User = require('./user');

const syncModels = async() => {
    try {
        await Product.sync();
        await User.sync();
    } catch (error) {
        console.error("Error synchronizing models:", error);
    }
};

module.exports = syncModels;