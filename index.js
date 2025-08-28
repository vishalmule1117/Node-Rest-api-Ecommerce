require("dotenv").config();
const express = require('express');
const app = express();
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 3002;

const product_routes = require("./routes/products")

app.get('/', (req, res) => {
  res.send('Hello Vishal!')
})

// Middleware for Router 
app.use("/api/products", product_routes);


const start = async () =>  {
  try {
    // await connectDB(process.env.MONGODB_URL);
     await connectDB('mongodb+srv://advvish17:tQZ3tEXCOAaSVaL5@node-rest-api-ecommerce.gilxu7y.mongodb.net/advvish17?retryWrites=true&w=majority&appName=Node-Rest-api-Ecommerce');
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start();
