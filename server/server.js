const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({path:"config.env"});

const dbConnection = require('./config/database');
const ApiError = require("./utils/ApiError");
const globalError = require('./middlewares/errorMiddleware');
const mountRoutes = require('./routes/index');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to DB
dbConnection();

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`Mode: ${process.env.NODE_ENV}`);
}

// Mount routes
mountRoutes(app);

// Handle undefined routes
app.all('*', (req, res, next) => {
    next(new ApiError(`Cannot find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalError);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`Unhandled Rejection Error: ${err.message}`);
    server.close(() => {
        console.error('Shutting down...');
        process.exit(1);
    });
});
