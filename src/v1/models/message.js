const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");

const Message = sequelize.define("message", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    msg: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

module.exports = Message;
