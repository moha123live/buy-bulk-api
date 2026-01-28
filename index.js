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
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use("/api/v1", routes);
app.get('/api/ping', (req, res) => {
    res.status(200).json({ message: 'API is running smoothly!' });
});
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        await syncModels();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup error:", error);
    }
};

startServer();