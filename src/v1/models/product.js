const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");

const Product = sequelize.define("product", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    selling_price: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    market_price: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    stock: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    image: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
    }
});

module.exports = Product;
