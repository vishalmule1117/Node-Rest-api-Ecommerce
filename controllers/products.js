const Product = require("../models/product")

const getAllProducts = async (req,res) =>  {

    const {company, name, featured} = req.query;
    const queryObject = {};

    if(company){
        queryObject.company = company;
    }
    if(name){
        //! Advanced search query 
        queryObject.name = { $regex: name, $options: "i" };
    }
    if(featured){
        queryObject.featured = featured;
    }
    //!  Fetch Data From MongoDB and Product Models
    const productList = await Product.find(queryObject)
    res.status(200).json( { productList } )
}

const getAllProductsTesting = async (req,res) =>  {

    const {company, name, featured} = req.query;
    const queryObject = {};

    if(company){
        queryObject.company = company;
    }
    if(name){
        //! Advanced search query 
        queryObject.name = { $regex: name, $options: "i" };
    }
    if(featured){
        queryObject.featured = featured;
    }
    
    //!  Fetch Data From MongoDB and Product Models
    const productList = await Product.find(queryObject)
    res.status(200).json( { productList } )
}

module.exports = {getAllProducts, getAllProductsTesting}