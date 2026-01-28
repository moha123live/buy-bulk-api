const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306, // ADD THIS - Hostinger uses port 3306
    dialect: 'mysql', // Remove the duplicate dialect line
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      connectTimeout: 60000 // ADD THIS for timeout
    },
    logging: console.log, // Change to console.log for debugging
    pool: {
      max: 3, // REDUCE to 3 (Hostinger has low connection limits)
      min: 0,
      acquire: 60000, // Increase to 60 seconds
      idle: 10000
    },
    retry: { // ADD retry configuration
      match: [
        /ETIMEDOUT/,
        /ECONNREFUSED/,
        /EHOSTUNREACH/,
        /SequelizeConnectionError/
      ],
      max: 5,
      backoffBase: 1000,
      backoffExponent: 1.5,
    },
    timezone: '+00:00'
  }
);

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MySQL...');
    console.log('Host:', process.env.DB_HOST);
    console.log('Database:', process.env.DB_NAME);
    console.log('User:', process.env.DB_USER);
    
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL successfully");
  } catch (error) {
    console.error("❌ Unable to connect to MySQL:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    
    // Log parent error details
    if (error.parent) {
      console.error("Parent error code:", error.parent.code);
      console.error("Parent error message:", error.parent.message);
    }
    
    // Try alternative connection without SSL
    console.log("\n⚠️  Trying alternative connection without SSL...");
    try {
      const sequelizeNoSSL = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT || 3306,
          dialect: 'mysql',
          logging: console.log,
          dialectOptions: {
            connectTimeout: 60000
          },
          pool: {
            max: 3,
            min: 0,
            acquire: 60000,
            idle: 10000
          }
        }
      );
      
      await sequelizeNoSSL.authenticate();
      console.log("✅ Connected without SSL!");
      // Replace the original sequelize instance
      Object.assign(sequelize, sequelizeNoSSL);
      return;
    } catch (sslError) {
      console.error("❌ Also failed without SSL:", sslError.message);
    }
    
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };