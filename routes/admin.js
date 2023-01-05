const path = require("path");

const express = require("express");

const {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  getProducts,
} = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", getAddProduct);

// /admin/products => GET
router.get("/products", getProducts);

// /admin/add-product => POST
router.post("/add-product", postAddProduct);

// /admin/edit-product/:productId => Get
router.get("/edit-product/:productId", getEditProduct);

module.exports = router;
