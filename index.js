import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

// ✅ Create express app
const app = express();

app.use(cors({
  origin : "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
import connectDB from "./db/connect.js";

const PORT = process.env.PORT || 3002;

import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";

app.get('/', (req, res) => {
  res.send('Hello Vishal!')
})

// Middleware for Router 
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

const start = async () =>  {
  try {
    // await connectDB(process.env.MONGODB_URL);
     await connectDB('mongodb+srv://advvish17:tQZ3tEXCOAaSVaL5@node-rest-api-ecommerce.gilxu7y.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Node-Rest-api-Ecommerce');
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}
start();
