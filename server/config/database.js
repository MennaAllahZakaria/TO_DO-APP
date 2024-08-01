const mongoose = require("mongoose");

const dbConnection = () => {
    mongoose
        .connect(process.env.DB_URI, {
        })
        .then((conn) => {
        console.log(`Database connected: ${conn.connection.host}`);
        })
        .catch((err) => {
        console.error(`Database connection error: ${err.message}`);
        process.exit(1); // Exit process with failure
        });
    };

module.exports = dbConnection;
