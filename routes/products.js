const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getAllProductsTesting,
  singleProdutById,
} = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/testing").get(getAllProductsTesting);
router.route("/:id").get(singleProdutById);

module.exports = router;
