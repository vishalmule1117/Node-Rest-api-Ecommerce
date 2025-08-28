const mongoose = require("mongoose");

const connectDB = () => {
    console.log("conected Mongo DB");
    return mongoose.connect(process.env.MONGODB_URL);
    // return mongoose.connect('mongodb+srv://advvish17:tQZ3tEXCOAaSVaL5@node-rest-api-ecommerce.gilxu7y.mongodb.net/advvish17?retryWrites=true&w=majority&appName=Node-Rest-api-Ecommerce');
}

module.exports = connectDB;