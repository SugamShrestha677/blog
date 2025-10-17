const mongoose = require("mongoose")
const config = require('./config');
const db={};

db.connect = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log("Database Connected successfully!");
        
        
    } catch (error) {
        console.error("Database connection failed!");
        process.exit(1);
    }
}

db.disconnect=async () => {
    try {
        await mongoose.connection.close(config.MONGODB_URI);
        console.log("Database disconnected successfully!");
        
    } catch (error) {
        console.error("Errose in Database disconnection!",error)
    }
}