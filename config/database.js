const { Sequelize } = require('sequelize');

const db_connect = {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST || "mysql",
    "dialect": process.env.DB_DIALECT,
    "logging":  false
}

const sequelize = new Sequelize(db_connect);

const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log("✅ Connected to MySQL");
      await sequelize.sync({ force: false }); // ✅ Sync models if needed
    } catch (error) {
      console.error("❌ Unable to connect to MySQL:", error);
      process.exit(1);
    }
  };


module.exports = { sequelize, connectDB };
