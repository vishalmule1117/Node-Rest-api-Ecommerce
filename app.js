const express = require('express');
const app = express();
const port = 3002;

const product_routes = require("./routes/products")

app.get('/', (req, res) => {
  res.send('Hello Vishal!')
})

// Middleware for Router 
app.use("/api/products", product_routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
