const Product = require("../models/product")

const getAllProducts = async (req,res) =>  {

    //?  Fetch Data From MongoDB and Product Models
    const productList = await Product.find(req.query)

    res.status(200).json( { productList } )
}

const getAllProductsTesting = async (req,res) =>  {
    
    // % request the Query in URL
    const productList = await Product.find(req.query)

    res.status(200).json( { productList } )
}

module.exports = {getAllProducts, getAllProductsTesting}