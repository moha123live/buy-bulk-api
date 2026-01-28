const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false,
    port: 3306
  }
);

const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connected to MySQL");
      // await sequelize.sync({ force: false });
    } catch (error) {
      console.error("Unable to connect to MySQL:", error);
      process.exit(1);
    }
  };


module.exports = { sequelize, connectDB };
