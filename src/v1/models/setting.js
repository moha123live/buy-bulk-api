const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/database");

const Setting = sequelize.define("setting", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    logo_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    place: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    fb: {
        type: DataTypes.TEXT,
        allowNull: true,
    }, 
    twitter: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    linked_in: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    insta: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    location: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    contact_phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    contact_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
});

module.exports = Setting;
