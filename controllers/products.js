const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { company, title, featured, category, brand, beauty, sort, select } =
    req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }
  if (title) {
    //! Advanced search query
    queryObject.title = { $regex: title, $options: "i" };
  }
  if (featured) {
    queryObject.featured = featured;
  }
  if (category) {
    queryObject.category = category;
  }
  if (brand) {
    queryObject.brand = brand;
  }
  if (beauty) {
    queryObject.beauty = beauty;
  }

  //* Sort data as per URL find
  let productApiData = Product.find(queryObject);
  if (sort) {
    let sortFix = sort.split(",").join(" ");
    productApiData = productApiData.sort(sortFix);
  }
  //@ Select data as per URL finder
  if (select) {
    let selectFix = select.split(",").join(" ");
    productApiData = productApiData.select(selectFix);
  }

  if (req.query.page || req.query.limit) {
    //! Pagination set as per need
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 8;
    let skip = (page - 1) * limit;

    // Base query (can include filters or sorting)
    let productApiData = Product.find();

    // 🔹 Get total count BEFORE applying skip/limit
    const totalCount = await productApiData.clone().countDocuments();

    // Apply pagination
    const productList = await productApiData.skip(skip).limit(limit);
    res.status(200).json({
      status: true,
      productList,
      totalCount,
    });
  } else {
    //! Pagination will set default result and Fetch Data From MongoDB Local Compass
    const productList = await productApiData;
    res.status(200).json({ status: true, productList });
  }

  const productList = await productApiData;
  res.status(200).json({ status: true, productList });
};

const getAllProductsTesting = async (req, res) => {
  const { company, title, featured, category, brand, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }
  if (title) {
    //! Advanced search query
    queryObject.title = { $regex: title, $options: "i" };
  }
  if (category) {
    queryObject.category = category;
  }
  if (brand) {
    queryObject.brand = brand;
  }
  if (featured) {
    queryObject.featured = featured;
  }

  //* Sort data as per URL find
  let productApiData = Product.find(queryObject);
  if (sort) {
    let sortFix = sort.split(",").join(" ");
    productApiData = productApiData.sort(sortFix);
  }
  //@ Select data as per URL finder
  if (select) {
    let selectFix = select.split(",").join(" ");
    productApiData = productApiData.select(selectFix);
  }

  if (req.query.page || req.query.limit) {
    //! Pagination set as per need
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;
    productApiData = productApiData.skip(skip).limit(limit);
  } else {
    //! Pagination will set default result and Fetch Data From MongoDB Local Compass
    const productList = await productApiData;
    res.status(200).json({ status: true, data: { productList } });
  }
};

const singleProdutById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "No product found with this id" });
    }
    // add id field and remove _id if you want
    product.id = product._id;

    res.json(product);
  } catch (error) {
    res.ststus(500).json({ msg: error });
  }
};

module.exports = { getAllProducts, getAllProductsTesting, singleProdutById };
