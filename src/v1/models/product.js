const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    selling_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    market_price: {
        type: DataTypes.DECIMAL(10,2),
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
