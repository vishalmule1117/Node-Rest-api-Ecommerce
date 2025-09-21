const mongoose = require("mongoose");

const connectDB = () => {
  console.log("conected Mongo DB");
  return mongoose.connect(process.env.MONGODB_URL);

  //? code for reder.com
  // return mongoose.connect('mongodb+srv://advvish17:tQZ3tEXCOAaSVaL5@node-rest-api-ecommerce.gilxu7y.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Node-Rest-api-Ecommerce');
};

module.exports = connectDB;
