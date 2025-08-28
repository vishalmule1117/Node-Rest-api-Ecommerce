// ? Created connection between mongoDB and product Model 
require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");
const ProductJson = require("./products.json");

const start = async () => {
    try {
        //! Connect data MongoDB URL
        await connectDB(process.env.MONGODB_URL);
        // await connectDB('mongodb+srv://advvish17:tQZ3tEXCOAaSVaL5@node-rest-api-ecommerce.gilxu7y.mongodb.net/advvish17?retryWrites=true&w=majority&appName=Node-Rest-api-Ecommerce');

        // ! deleteMany() remove duplicate Entry of JSON data
        await Product.deleteMany();
        await Product.create(ProductJson);
        console.log("Send Data to mongoDB")

    }catch (error){
        console.log(error);
    }
}

start();