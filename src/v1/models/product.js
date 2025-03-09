const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");

const Product = sequelize.define("product", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    selling_price: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false,
        validate: {
            min: 0,
        }
    },
    text: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    market_price: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false,
        validate: {
            min: 0,
        }
    },
    stock: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    units: {
        type: DataTypes.ENUM("kg", "g", "l", "ml", "packs", "pcs", "units", "boxs", "bags"),
        allowNull: true,
    },
    image: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
    }
});

module.exports = Product;
