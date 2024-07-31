const mongoose = require("mongoose");

const dbConnection = () => {
    mongoose
        .connect(`mongodb+srv://mennazakaria2003:2xglwWiavsjR9acj@todo.jaeeysi.mongodb.net/`, {
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
