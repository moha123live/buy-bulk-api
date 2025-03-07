const Product = require("./product");
const Message = require("./message");
const User = require('./user');

const syncModels = async() => {
    try {
        await Product.sync();
        await Message.sync();
        await User.sync();
    } catch (error) {
        console.error("Error synchronizing models:", error);
    }
};

module.exports = syncModels;