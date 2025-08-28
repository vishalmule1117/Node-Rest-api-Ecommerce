const Product = require("../models/product")

const getAllProducts = async (req,res) =>  {

    const {company,title,featured,category,brand,sort,select } = req.query;
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

    //* Sort data as per URL find
    let productApiData = Product.find(queryObject)
    if(sort) {
        let sortFix = sort.split(",").join(" ");
        productApiData = productApiData.sort(sortFix);
    }
    //@ Select data as per URL finder
    if(select) {
        let selectFix = select.split(",").join(" ");
        productApiData = productApiData.select(selectFix);
    }

    if(req.query.page || req.query.limit){
         //! Pagination set as per need
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 5;
        let skip = (page - 1) * limit;
        productApiData = productApiData.skip(skip).limit(limit);
    }else {
         //! Pagination will set default result
        const productList = await productApiData;
        res.status(200).json( { status: true, data: { productList } } )
    }

    //!  Fetch Data From MongoDB Local Compass
    const productList = await productApiData;
    res.status(200).json( { status: true, data: { productList } } )
}

const getAllProductsTesting = async (req,res) =>  {

    const {company, title, featured,category,brand,sort,select} = req.query;
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
    //! Select data as per URL finder
    if(select) {
        let selectFix = select.split(",").join(" ");
        productApiData = productApiData.select(selectFix);
    }
    //! Pagination set as per need
    if(req.query.page || req.query.limit){
        //! Pagination set as per need
       let page = Number(req.query.page) || 1;
       let limit = Number(req.query.limit) || 5;
       let skip = (page - 1) * limit;
       productApiData = productApiData.skip(skip).limit(limit);
    }else {
        //! Pagination will set default result
        const productList = await productApiData;
        res.status(200).json( { status: true, data: { productList } } )
    }

    //!  Fetch Data From MongoDB and Product Models
    const productList = await productApiData;
    res.status(200).json({ 
        status: true, 
        data: { productList } 
    })
}

module.exports = {getAllProducts, getAllProductsTesting}