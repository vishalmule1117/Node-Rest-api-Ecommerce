const Product = require("../models/product")

const getAllProducts = async (req,res) =>  {

    const {company, title, featured,category, brand, sort } = req.query;
    const queryObject = {};

    if(company){
        queryObject.company = company;
    }
    if(title){
        //! Advanced search query 
        queryObject.title = { $regex: title, $options: "i" };
    }
    if(category){
        queryObject.category = category;
    }
    if(brand){
        queryObject.brand = brand;
    }
    if(featured){
        queryObject.featured = featured;
    }
    //! sort data as per URL finder
    let productApiData = Product.find(queryObject)
    if(sort) {
        let sortFix = sort.replace(",", " ");
        productApiData = productApiData.sort(sortFix);
    }

    //!  Fetch Data From MongoDB and Product Models
    const productList = await productApiData;
    res.status(200).json( { status: true, data: { productList } } )
}

const getAllProductsTesting = async (req,res) =>  {

    const {company, title, featured,category,brand, sort} = req.query;
    const queryObject = {};

    if(company){
        queryObject.company = company;
    }
    if(title){
        //! Advanced search query 
        queryObject.title = { $regex: title, $options: "i" };
    }
    if(category){
        queryObject.category = category;
    }
    if(brand){
        queryObject.brand = brand;
    }
    if(featured){
        queryObject.featured = featured;
    }
    //! sort data as per URL finder
    let productApiData = Product.find(queryObject)
    if(sort) {
        let sortFix = sort.replace(",", " ");
        productApiData = productApiData.sort(sortFix);
    }
    
    //!  Fetch Data From MongoDB and Product Models
    const productList = await productApiData;
    res.status(200).json( { productList } )
}

module.exports = {getAllProducts, getAllProductsTesting}