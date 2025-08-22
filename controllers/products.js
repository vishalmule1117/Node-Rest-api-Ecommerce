const getAllProducts = async (req,res) =>  {
    res.status(200).json( { msg : "I am GetAllProduct"} )
}

const getAllProductsTesting = async (req,res) =>  {
    res.status(200).json( { msg : "I am GetAllProductTesting"} )
}

module.exports = {getAllProducts, getAllProductsTesting}