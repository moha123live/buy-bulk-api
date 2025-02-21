const Product = require("./product");

const syncModels = async() => {
    try {
        await Product.sync();
    } catch (error) {
        console.error("Error synchronizing models:", error);
    }
};

module.exports = syncModels;