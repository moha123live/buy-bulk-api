const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
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
  define: { timestamps: true }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    //  After first run, change to:
    // await sequelize.sync();
    console.log("PostgreSQL connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to PostgreSQL:", error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };