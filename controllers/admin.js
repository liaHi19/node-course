const { Product } = require("../models/Product");

const getAddProduct = (req, res) => {
  res.render("admin/add-product", {
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
  Product.getAllProducts((products) => {
    res.render("admin/products", {
      products,
      docTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
module.exports = { getAddProduct, postAddProduct, getProducts };
