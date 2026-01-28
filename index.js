require("./config/env");
require("./src/v1/utils/constants");
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/database");
const syncModels = require("./src/v1/models/dbSync");
const errorHandler = require("./src/v1/middlewares/errorHandler");
const routes = require("./src/v1/routes");

const app = express();
const FRONTEND_URL = process.env.FRONT_END;
app.use(cors({
    origin: FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

app.use("/api/v1", routes);
app.get('/api/ping', (req, res) => {
    res.status(200).json({ 
        message: 'API is running smoothly!',
        database: 'PostgreSQL'
    });
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        console.log('Starting server...');
        await connectDB();
        console.log('Database connected');
        await syncModels();
        console.log('Models synchronized');
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error("Server startup error:", error.message);
        console.error("Stack trace:", error.stack);
        process.exit(1);
    }
};

startServer();