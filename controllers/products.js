const { Product } = require("../models/Product");

const getAddProduct = (req, res) => {
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
  });
};

const postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

const getProducts = (req, res, next) => {
  const products = Product.getAllProducts();
  res.render("shop", { products, docTitle: "Shop", path: "/" });
};

module.exports = { getAddProduct, postAddProduct, getProducts };
