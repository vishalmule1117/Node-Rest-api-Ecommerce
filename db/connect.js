const mongoose = require("mongoose");

const connectDB = () => {
    console.log("conected Mongo DB")
    return mongoose.connect(process.env.MONGODB_URL);
}

module.exports = connectDB;