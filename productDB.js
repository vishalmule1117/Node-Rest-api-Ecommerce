// ? Created connection between mongoDB and product Model

require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");

const ProductJson = require("./products.json");

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        await Product.create(ProductJson);
        console.log("Send Data to mongoDB")
    }catch (error){
        console.log(error);
    }
}

start();