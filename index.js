require("./config/env");
require("./src/v1/utils/constants");
const express = require("express");
const cors = require("cors");
const { sequelize, connectDB } = require("./config/database");
// const syncModels = require("./src/v1/models/dbSync");
const errorHandler = require("./src/v1/middlewares/errorHandler");
const routes = require("./src/v1/routes");

const app = express();
const FRONTEND_URL = process.env.FRONT_END;

app.use(
    cors({
        origin: FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

app.use("/api/v1", routes);


app.get("/api/worker", (req, res) => {
  res.status(200).json({
    workerPid: process.pid,
    message: 'working fine'
  });
});

app.get("/api/ping", (req, res) => {
    res.status(200).json({
        message: "API is running smoothly!",
        database: "PostgreSQL",
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString(),
    });
});



app.use(errorHandler);

const PORT = process.env.PORT || 3000;

let server;

const startServer = async () => {
  try {
    await connectDB();
    console.log(`Worker ${process.pid} - Database connected`);
  } catch (error) {
    console.error("DB connection failed, continuing without DB");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Worker ${process.pid} - Server running on port ${PORT}`
    );
  });
};

startServer(); 


const shutdown = async (signal) => {
  console.log(`\nWorker ${process.pid} received ${signal}. Shutting down gracefully...`);
  if (server) {
    console.log('coming inside');
    
    server.close(async () => {
      try {
        await sequelize.close();
        console.log('sequlizer closed')
        process.exit(0);
      } catch (err) {
        console.error("Error closing DB connection", err);
        process.exit(1);
      }
    });
  }
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);