const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true, // Important for Hostinger
        rejectUnauthorized: false
      }
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    timezone: '+00:00' 
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
